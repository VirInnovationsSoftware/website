import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) return <Navigate to="/admin/careers" replace />;
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else setSignedIn(true);
  };

  return <main className="min-h-screen flex items-center justify-center bg-background px-4">
    <section className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to site</Link>
      <h1 className="mt-6 text-2xl font-semibold">Careers admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in with an authorized HR account.</p>
      {!isSupabaseConfigured ? <p role="alert" className="mt-5 text-sm text-destructive">Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p> :
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm">Email<input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          <label className="block text-sm">Password<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        </form>}
    </section>
  </main>;
}
