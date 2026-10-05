export type Job = {
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
};

const jobsApiUrl = import.meta.env.VITE_JOBS_API_URL?.trim();

function loadJobsJsonp(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const callbackName = `__jobsFeed_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const callbackWindow = window as unknown as Record<string, (data: unknown) => void>;
    const script = document.createElement("script");
    const endpoint = new URL(url);
    endpoint.searchParams.set("callback", callbackName);

    const cleanup = () => {
      delete callbackWindow[callbackName];
      script.remove();
      window.clearTimeout(timeout);
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("The jobs feed took too long to respond."));
    }, 15000);

    callbackWindow[callbackName] = (data) => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error("Could not load open positions.")); };
    script.src = endpoint.toString();
    document.head.appendChild(script);
  });
}

export async function getOpenJobs(): Promise<Job[]> {
  if (!jobsApiUrl) return [];

  const payload = await loadJobsJsonp(jobsApiUrl);
  if (!Array.isArray(payload)) throw new Error("The jobs feed returned invalid data.");

  return payload.filter((job): job is Job =>
    Boolean(job && typeof job === "object" &&
      typeof job.title === "string" &&
      typeof job.applyLink === "string" &&
      /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/.test(job.applyLink))
  ).map((job) => ({
    title: job.title,
    department: job.department || "",
    location: job.location || "",
    type: job.type || "",
    description: job.description || "",
    requirements: Array.isArray(job.requirements) ? job.requirements : [],
    responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
    qualifications: Array.isArray(job.qualifications) ? job.qualifications : [],
    experience: typeof job.experience === "string" ? job.experience : "",
    jdUrl: job.jdUrl || "",
    applyLink: job.applyLink,
  }));
}

export const isJobsFeedConfigured = Boolean(jobsApiUrl);
