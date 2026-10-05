import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Cpu, ExternalLink, Lightbulb, MapPin, Search, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOpenJobs, isJobsFeedConfigured, Job } from "@/lib/jobs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LINKEDIN_JOBS_URL = "https://www.linkedin.com/company/virinnovations/jobs/";

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(false);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");
  const [employmentType, setEmploymentType] = useState("All employment types");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    getOpenJobs()
      .then(setJobs)
      .catch((error) => { console.error("Unable to load jobs:", error); setJobsError(true); })
      .finally(() => setJobsLoading(false));
  }, []);

  const departments = useMemo(() => [...new Set(jobs.map((job) => job.department).filter(Boolean))].sort(), [jobs]);
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location).filter(Boolean))].sort(), [jobs]);
  const employmentTypes = useMemo(() => [...new Set(jobs.map((job) => job.type).filter(Boolean))].sort(), [jobs]);
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || [job.title, job.department, job.location, job.type, job.experience, job.description, ...job.requirements, ...job.responsibilities, ...job.qualifications].some((value) => value.toLowerCase().includes(term));
    return matchesQuery && (department === "All departments" || job.department === department) && (location === "All locations" || job.location === location) && (employmentType === "All employment types" || job.type === employmentType);
  }), [jobs, query, department, location, employmentType]);

  const resetFilters = () => { setQuery(""); setDepartment("All departments"); setLocation("All locations"); setEmploymentType("All employment types"); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-section-alt pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">Careers at Militros</p>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-6xl">Build technology that <span className="text-accent">matters.</span></h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">Join a team of engineers, researchers, and builders creating meaningful advances in robotics, automation, and defence technology.</p>
                <a href="#open-roles" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accent/90">Explore open roles <ArrowRight className="h-4 w-4" /></a>
              </motion.div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Lightbulb, title: "Solve hard problems", text: "Work hands-on across ambitious, real-world engineering challenges." },
                  { icon: Users, title: "Grow together", text: "Learn from a collaborative team that values curiosity and ownership." },
                  { icon: Cpu, title: "Make an impact", text: "Help shape technologies with purpose and lasting value." },
                ].map(({ icon: Icon, title, text }, index) => (
                  <motion.div key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.08 }} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="mb-4 h-5 w-5 text-accent" />
                    <h2 className="font-semibold text-foreground">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="open-roles" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Find your place</p>
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl">Open positions</h2>
                  <p className="mt-3 text-muted-foreground">Explore current opportunities and find a role that fits your skills.</p>
                </div>
                {!jobsLoading && !jobsError && jobs.length > 0 && <p className="text-sm text-muted-foreground">{filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"} available</p>}
              </div>

              {!jobsLoading && !jobsError && jobs.length > 0 && (
                <div className="mb-7 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-2 xl:grid-cols-[1fr_210px_210px_210px]">
                  <label className="relative block">
                    <span className="sr-only">Search roles</span>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles or keywords" className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </label>
                  <label>
                    <span className="sr-only">Filter by department</span>
                    <select value={department} onChange={(event) => setDepartment(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                      <option>All departments</option>{departments.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Filter by location</span>
                    <select value={location} onChange={(event) => setLocation(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                      <option>All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Filter by employment type</span>
                    <select value={employmentType} onChange={(event) => setEmploymentType(event.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                      <option>All employment types</option>{employmentTypes.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                </div>
              )}

              {jobsLoading ? (
                <div className="grid gap-4 md:grid-cols-2"><div className="h-48 animate-pulse rounded-xl bg-muted" /><div className="h-48 animate-pulse rounded-xl bg-muted" /></div>
              ) : jobsError ? (
                <div className="rounded-xl border border-border bg-card px-6 py-14 text-center"><Briefcase className="mx-auto mb-4 h-8 w-8 text-muted-foreground" /><h3 className="text-lg font-semibold text-foreground">Roles are temporarily unavailable</h3><p className="mt-2 text-sm text-muted-foreground">Please try again later or browse our LinkedIn jobs page.</p></div>
              ) : filteredJobs.length === 0 ? (
                <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
                  <Briefcase className="mx-auto mb-4 h-8 w-8 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">{jobs.length ? "No roles match your search" : "No openings available"}</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{jobs.length ? "Try a different keyword or clear your filters to see all current opportunities." : "We’re always interested in meeting people who care about meaningful technology. Check back soon for new opportunities."}</p>
                  {jobs.length > 0 ? <button onClick={resetFilters} className="mt-5 text-sm font-semibold text-accent hover:underline">Clear filters</button> : !isJobsFeedConfigured ? <p className="mt-4 text-xs text-muted-foreground">The careers feed has not been connected yet.</p> : null}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredJobs.map((job, index) => (
                    <motion.article key={`${job.title}-${job.department}-${index}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }} className="flex flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg">
                      <div className="flex-1">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {job.department && <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{job.department}</span>}
                          {job.type && <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{job.type}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                        {job.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{job.description}</p>}
                        {job.experience && <p className="mt-3 text-sm text-muted-foreground"><span className="font-medium text-foreground">Experience:</span> {job.experience}</p>}
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                          {job.location && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <button onClick={() => setSelectedJob(job)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent">View details <ArrowRight className="h-4 w-4" /></button>
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90">Apply now <ExternalLink className="h-3.5 w-3.5" /></a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-section-alt py-12">
          <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left">
            <div><h2 className="text-xl font-bold text-foreground">Looking for more opportunities?</h2><p className="mt-1 text-sm text-muted-foreground">See the latest openings on our LinkedIn page.</p></div>
            <a href={LINKEDIN_JOBS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent">View LinkedIn jobs <ExternalLink className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <Dialog open={Boolean(selectedJob)} onOpenChange={(open) => { if (!open) setSelectedJob(null); }}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {selectedJob && <>
            <DialogHeader>
              <div className="mb-2 flex flex-wrap gap-2">{selectedJob.department && <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{selectedJob.department}</span>}{selectedJob.type && <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{selectedJob.type}</span>}</div>
              <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-x-4 gap-y-1 pt-1">{selectedJob.location && <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{selectedJob.location}</span>}{selectedJob.experience && <span>Experience: {selectedJob.experience}</span>}</DialogDescription>
            </DialogHeader>
            {selectedJob.description && <div className="mt-3"><h3 className="mb-2 font-semibold text-foreground">About the role</h3><p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">{selectedJob.description}</p></div>}
            {selectedJob.responsibilities.length > 0 && <div><h3 className="mb-2 font-semibold text-foreground">Responsibilities</h3><ul className="space-y-2">{selectedJob.responsibilities.map((item, index) => <li key={`${index}-${item}`} className="flex gap-2 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div>}
            {selectedJob.requirements.length > 0 && <div><h3 className="mb-2 font-semibold text-foreground">What you’ll bring</h3><ul className="space-y-2">{selectedJob.requirements.map((item, index) => <li key={`${index}-${item}`} className="flex gap-2 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div>}
            {selectedJob.qualifications.length > 0 && <div><h3 className="mb-2 font-semibold text-foreground">Qualifications</h3><ul className="space-y-2">{selectedJob.qualifications.map((item, index) => <li key={`${index}-${item}`} className="flex gap-2 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div>}
            <div className="mt-3 flex flex-wrap gap-3">
              {selectedJob.jdUrl && <a href={selectedJob.jdUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Full job description <ExternalLink className="h-4 w-4" /></a>}
              <a href={selectedJob.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90">Apply for this role <ExternalLink className="h-4 w-4" /></a>
            </div>
          </>}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Careers;
