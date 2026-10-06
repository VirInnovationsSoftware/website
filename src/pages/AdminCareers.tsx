import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { GOOGLE_FORM_URL_PATTERN, GOOGLE_SHEET_URL_PATTERN, HTTPS_URL_PATTERN, JobRow, JobStatus, jobUrl } from "@/lib/jobs";

type AdminJob = JobRow & { responses_url: string | null };

type JobForm = {
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience: string;
  description: string;
  responsibilities: string;
  requirements: string;
  qualifications: string;
  jd_url: string;
  google_form_url: string;
  responses_url: string;
  status: JobStatus;
};

const EMPTY_FORM: JobForm = {
  title: "", department: "", location: "", employment_type: "Full-time", experience: "",
  description: "", responsibilities: "", requirements: "", qualifications: "",
  jd_url: "", google_form_url: "", responses_url: "", status: "draft",
};

const formFromJob = (job: AdminJob): JobForm => ({
  title: job.title, department: job.department ?? "", location: job.location ?? "",
  employment_type: job.employment_type ?? "", experience: job.experience ?? "",
  description: job.description ?? "", responsibilities: job.responsibilities ?? "",
  requirements: job.requirements ?? "", qualifications: job.qualifications ?? "",
  jd_url: job.jd_url ?? "", google_form_url: job.google_form_url ?? "",
  responses_url: job.responses_url ?? "", status: job.status,
});

// What the job dialog is doing: editing an existing job (job set) or creating one
// (job null), starting from `initial`.
type EditorState = { job: AdminJob | null; initial: JobForm; heading: string; hint: string };

const LIST_HINT = "For list fields, put one item per line.";

const STATUS_STYLES: Record<JobStatus, string> = {
  published: "bg-green-500/10 text-green-600",
  draft: "bg-muted text-muted-foreground",
  closed: "bg-destructive/10 text-destructive",
};

const inputClass = "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm";

export default function AdminCareers() {
  return <AdminGuard>{session => <AdminCareersContent session={session} />}</AdminGuard>;
}

function AdminCareersContent({ session }: { session: Session }) {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<EditorState | null>(null);

  const loadJobs = useCallback(async () => {
    if (!supabase) return;
    const [jobsResult, privateResult] = await Promise.all([
      supabase.from("jobs").select("*").order("created_at", { ascending: false }),
      supabase.from("job_private").select("job_id, responses_url"),
    ]);
    setLoading(false);
    if (jobsResult.error || privateResult.error) {
      toast.error((jobsResult.error ?? privateResult.error)!.message);
      return;
    }
    const responses = new Map(privateResult.data.map(row => [row.job_id, row.responses_url]));
    setJobs(jobsResult.data.map(job => ({ ...job, responses_url: responses.get(job.id) ?? null })));
  }, []);

  useEffect(() => { void loadJobs(); }, [loadJobs]);

  const setStatus = async (job: AdminJob, status: JobStatus) => {
    if (!supabase) return;
    if (status === "published" && !job.google_form_url) {
      toast.error("Add a Google Form link before publishing.");
      return;
    }
    const { error } = await supabase.from("jobs").update({ status }).eq("id", job.id);
    if (error) toast.error(error.message);
    else { toast.success(`"${job.title}" is now ${status}.`); void loadJobs(); }
  };

  const copyLink = async (job: AdminJob) => {
    try {
      await navigator.clipboard.writeText(jobUrl(job.slug));
      toast.success("Job link copied. Paste it into LinkedIn, WhatsApp or email.");
    } catch {
      toast.error("Could not copy the link.");
    }
  };

  const deleteJob = async (job: AdminJob) => {
    if (!supabase || !window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("jobs").delete().eq("id", job.id);
    if (error) toast.error(error.message);
    else { toast.success("Job deleted."); void loadJobs(); }
  };

  return <main className="min-h-screen bg-background px-4 py-12 md:px-6">
    <div className="mx-auto max-w-5xl space-y-6">
      <AdminHeader title="Careers Management" session={session} actions={
        <button onClick={() => setEditor({ job: null, initial: EMPTY_FORM, heading: "New job", hint: LIST_HINT })} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">New job</button>
      } />

      <section className="rounded-xl border bg-card shadow-sm">
        {loading ? <p className="p-8 text-center text-muted-foreground">Loading jobs…</p> :
          jobs.length === 0 ? <p className="p-8 text-center text-muted-foreground">No jobs yet. Click "New job" to post your first opening.</p> :
          <ul className="divide-y">
            {jobs.map(job => <li key={job.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">{job.title}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[job.status]}`}>{job.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{[job.department, job.location, job.employment_type].filter(Boolean).join(" · ") || "No details"}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {job.responses_url
                  ? <a href={job.responses_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 hover:bg-muted">View applications <ExternalLink className="h-3.5 w-3.5" /></a>
                  : <span className="rounded-md border border-dashed px-3 py-1.5 text-muted-foreground">No responses sheet linked</span>}
                {job.status === "published" && <button onClick={() => copyLink(job)} className="rounded-md border px-3 py-1.5 hover:bg-muted">Copy link</button>}
                <button onClick={() => setEditor({ job, initial: formFromJob(job), heading: "Edit job", hint: LIST_HINT })} className="rounded-md border px-3 py-1.5 hover:bg-muted">Edit</button>
                <button onClick={() => setEditor({
                  job: null,
                  // A copy starts hidden and without the original's form/sheet, so applications never mix.
                  initial: { ...formFromJob(job), title: `${job.title} (copy)`, google_form_url: "", responses_url: "", status: "draft" },
                  heading: "Duplicate job",
                  hint: "Change the title, then add this job's own Google Form and Sheet links. " + LIST_HINT,
                })} className="rounded-md border px-3 py-1.5 hover:bg-muted">Duplicate</button>
                {job.status === "published"
                  ? <button onClick={() => setStatus(job, "closed")} className="rounded-md border px-3 py-1.5 hover:bg-muted">Close</button>
                  : <button onClick={() => setStatus(job, "published")} className="rounded-md border px-3 py-1.5 hover:bg-muted">Publish</button>}
                <button onClick={() => deleteJob(job)} className="rounded-md border px-3 py-1.5 text-destructive hover:bg-destructive/10">Delete</button>
              </div>
            </li>)}
          </ul>}
      </section>
    </div>

    <Dialog open={editor !== null} onOpenChange={open => { if (!open) setEditor(null); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {editor !== null && <JobEditor
          {...editor}
          onSaved={() => { setEditor(null); void loadJobs(); }}
        />}
      </DialogContent>
    </Dialog>
  </main>;
}

function JobEditor({ job, initial, heading, hint, onSaved }: EditorState & { onSaved: () => void }) {
  const [form, setForm] = useState<JobForm>(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const field = (key: keyof JobForm) => ({
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  const validate = () => {
    const formUrl = form.google_form_url.trim();
    if (!form.title.trim()) return "Job title is required.";
    if (formUrl && !GOOGLE_FORM_URL_PATTERN.test(formUrl)) return "Application link must be a Google Form (docs.google.com/forms/… or forms.gle/…).";
    if (form.status === "published" && !formUrl) return "Add a Google Form link before publishing.";
    if (form.responses_url.trim() && !GOOGLE_SHEET_URL_PATTERN.test(form.responses_url.trim())) return "Responses link must be a Google Sheet (docs.google.com/spreadsheets/…).";
    if (form.jd_url.trim() && !HTTPS_URL_PATTERN.test(form.jd_url.trim())) return "Job description link must start with https://.";
    return "";
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    const problem = validate();
    setError(problem);
    if (problem) return;

    const { responses_url, ...rest } = form;
    const row = Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, v.trim() || null]));
    setBusy(true);
    const saved = job
      ? await supabase.from("jobs").update(row).eq("id", job.id).select("id").single()
      : await supabase.from("jobs").insert(row).select("id").single();
    if (saved.error) { setBusy(false); setError(saved.error.message); return; }

    const { error: privateError } = await supabase.from("job_private").upsert({
      job_id: saved.data.id, responses_url: responses_url.trim() || null, updated_at: new Date().toISOString(),
    });
    setBusy(false);
    if (privateError) { setError(`Job saved, but the responses link was not: ${privateError.message}`); return; }
    toast.success(job ? "Job updated." : "Job created.");
    onSaved();
  };

  return <>
    <DialogHeader>
      <DialogTitle>{heading}</DialogTitle>
      <DialogDescription>{hint}</DialogDescription>
    </DialogHeader>
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm">Job title *<input required {...field("title")} className={inputClass} /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">Department<input {...field("department")} className={inputClass} /></label>
        <label className="block text-sm">Location<input {...field("location")} placeholder="Hybrid, On-site…" className={inputClass} /></label>
        <label className="block text-sm">Employment type<input {...field("employment_type")} placeholder="Full-time, Internship…" className={inputClass} /></label>
        <label className="block text-sm">Experience<input {...field("experience")} placeholder="2+ years" className={inputClass} /></label>
      </div>
      <label className="block text-sm">About the role<textarea rows={4} {...field("description")} className={inputClass} /></label>
      <label className="block text-sm">Responsibilities<textarea rows={4} {...field("responsibilities")} className={inputClass} /></label>
      <label className="block text-sm">What you'll bring (requirements)<textarea rows={4} {...field("requirements")} className={inputClass} /></label>
      <label className="block text-sm">Qualifications<textarea rows={3} {...field("qualifications")} className={inputClass} /></label>
      <label className="block text-sm">Google Form link (where candidates apply)<input type="url" {...field("google_form_url")} placeholder="https://forms.gle/…" className={inputClass} /></label>
      <label className="block text-sm">Responses Google Sheet link (admins only)
        <input type="url" {...field("responses_url")} placeholder="https://docs.google.com/spreadsheets/…" className={inputClass} />
        <span className="mt-1 block text-xs text-muted-foreground">In Google Forms, open Responses → Link to Sheets, then paste the Sheet's link here.</span>
      </label>
      <label className="block text-sm">Full job description link (optional)<input type="url" {...field("jd_url")} placeholder="https://…" className={inputClass} /></label>
      <label className="block text-sm">Status
        <select {...field("status")} className={inputClass}>
          <option value="draft">Draft (hidden)</option>
          <option value="published">Published (visible on careers page)</option>
          <option value="closed">Closed (hidden)</option>
        </select>
      </label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{busy ? "Saving…" : job ? "Save changes" : "Create job"}</button>
    </form>
  </>;
}
