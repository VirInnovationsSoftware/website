import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const SITE_URL = 'https://militros.ai';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const indexHtml = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');

// Link-preview text for pages other than the homepage. WhatsApp, LinkedIn and
// other link previewers don't run JavaScript, so the server fills these in.
const PAGE_META = {
  '/careers': {
    title: 'Careers at Militros',
    description: 'Join a team of engineers, researchers and builders working on robotics, automation and defence technology. Explore open roles.',
  },
  '/contact': {
    title: 'Contact Militros',
    description: 'Get in touch with Militros about defence and technology solutions, partnerships or careers.',
  },
};

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function withMeta(html, { title, description, url }) {
  const set = (pattern, value) => { html = html.replace(pattern, (_, start, end) => `${start}${escapeHtml(value)}${end}`); };
  if (title) {
    set(/(<title>)[^<]*(<\/title>)/, title);
    set(/(<meta property="og:title" content=")[^"]*(")/, title);
    set(/(<meta name="twitter:title" content=")[^"]*(")/, title);
  }
  if (description) {
    set(/(<meta name="description" content=")[^"]*(")/, description);
    set(/(<meta property="og:description" content=")[^"]*(")/, description);
    set(/(<meta name="twitter:description" content=")[^"]*(")/, description);
  }
  set(/(<meta property="og:url" content=")[^"]*(")/, url);
  return html;
}

// Published job by slug, cached for a few minutes so shares don't hit the database every time.
const JOB_CACHE_MS = 5 * 60 * 1000;
const jobCache = new Map();

async function findPublishedJob(slug) {
  if (!SUPABASE_URL || !SUPABASE_KEY || !/^[a-z0-9-]{1,200}$/.test(slug)) return null;
  const cached = jobCache.get(slug);
  if (cached && Date.now() - cached.at < JOB_CACHE_MS) return cached.job;

  const query = new URLSearchParams({
    select: 'title,department,location,employment_type,description',
    slug: `eq.${slug}`,
    status: 'eq.published',
  });
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/jobs?${query}`, {
      headers: { apikey: SUPABASE_KEY },
      signal: AbortSignal.timeout(2000),
    });
    const job = response.ok ? (await response.json())[0] ?? null : null;
    if (jobCache.size > 500) jobCache.clear();
    jobCache.set(slug, { job, at: Date.now() });
    return job;
  } catch {
    return null; // Fall back to the generic careers preview.
  }
}

function jobMeta(job) {
  const facts = [job.department, job.location, job.employment_type].filter(Boolean).join(' · ');
  const summary = (job.description || '').replace(/\s+/g, ' ').trim();
  const short = summary.length > 160 ? `${summary.slice(0, 157)}…` : summary;
  return {
    title: `${job.title} – Careers at Militros`,
    description: [facts, short].filter(Boolean).join('. ') || PAGE_META['/careers'].description,
  };
}

// Serve built files; index.html is handled below so its meta tags can be filled in.
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

// For any request that doesn't match a static file, serve index.html
app.get('*', async (req, res) => {
  const pagePath = req.path.replace(/\/+$/, '') || '/';
  const jobSlug = pagePath.match(/^\/careers\/([^/]+)$/)?.[1];
  const job = jobSlug ? await findPublishedJob(jobSlug) : null;
  const meta = job ? jobMeta(job) : PAGE_META[jobSlug ? '/careers' : pagePath] ?? {};
  res.type('html').send(withMeta(indexHtml, { ...meta, url: `${SITE_URL}${pagePath === '/' ? '/' : pagePath}` }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
