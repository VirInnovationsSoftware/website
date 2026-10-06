import { differenceInCalendarDays, formatDistanceToNowStrict } from "date-fns";

export type JobStatus = "draft" | "published" | "closed";

// A row of public.jobs. List fields are stored as text, one item per line.
export type JobRow = {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  description: string | null;
  requirements: string | null;
  responsibilities: string | null;
  qualifications: string | null;
  experience: string | null;
  jd_url: string | null;
  google_form_url: string | null;
  status: JobStatus;
  created_at: string;
  published_at: string | null;
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  jdUrl: string;
  applyLink: string;
  publishedAt: string | null;
};

export const GOOGLE_FORM_URL_PATTERN = /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/;
export const GOOGLE_SHEET_URL_PATTERN = /^https:\/\/docs\.google\.com\/spreadsheets\//;
export const HTTPS_URL_PATTERN = /^https:\/\//;

const PUBLIC_JOB_COLUMNS =
  "id, slug, title, department, location, employment_type, description, requirements, responsibilities, qualifications, experience, jd_url, google_form_url, published_at";

// Full shareable address of a job, e.g. https://example.com/careers/embedded-intern-3f2a9c
export const jobUrl = (slug: string) => `${window.location.origin}/careers/${slug}`;

// "Posted today", "Posted yesterday", "Posted 5 days ago", "Posted 2 months ago".
export function postedLabel(publishedAt: string | null) {
  if (!publishedAt) return "";
  const date = new Date(publishedAt);
  const days = differenceInCalendarDays(new Date(), date);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  return `Posted ${formatDistanceToNowStrict(date, { unit: days < 30 ? "day" : undefined, roundingMethod: "floor" })} ago`;
}

export const splitLines = (value: string | null) =>
  (value ?? "").split("\n").map((line) => line.trim()).filter(Boolean);

function toJob(row: Omit<JobRow, "status" | "created_at">): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department ?? "",
    location: row.location ?? "",
    type: row.employment_type ?? "",
    description: row.description ?? "",
    requirements: splitLines(row.requirements),
    responsibilities: splitLines(row.responsibilities),
    qualifications: splitLines(row.qualifications),
    experience: row.experience ?? "",
    jdUrl: row.jd_url && HTTPS_URL_PATTERN.test(row.jd_url) ? row.jd_url : "",
    applyLink: row.google_form_url ?? "",
    publishedAt: row.published_at,
  };
}

// Published jobs, newest first. Jobs without a valid Google Form link are hidden
// so visitors never see an "Apply" button that goes nowhere.
export async function getOpenJobs(): Promise<Job[]> {
  // Imported on demand so the Supabase library isn't part of the homepage's first download.
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("jobs")
    .select(PUBLIC_JOB_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;

  return data
    .filter((row) => row.google_form_url && GOOGLE_FORM_URL_PATTERN.test(row.google_form_url))
    .map(toJob);
}
