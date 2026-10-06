import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  // Already signed in (e.g. HR clicked "Staff login" again): go straight to the admin page.
  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => { if (data.session) setSignedIn(true); });
  }, []);

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

  const sendResetLink = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage(""); setNotice("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setBusy(false);
    // Supabase answers the same whether or not the account exists, so the notice
    // can't be used to find out which emails are admins.
    if (error?.status === 429) setMessage("Too many requests. Please wait a few minutes and try again.");
    else if (error) setMessage(error.message);
    else setNotice("If that email belongs to an admin account, a password reset link is on its way. Check your inbox and spam folder.");
  };

  const switchMode = (next: "signin" | "forgot") => { setMode(next); setMessage(""); setNotice(""); };

  return <main className="min-h-screen flex items-center justify-center bg-background px-4">
    <section className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to site</Link>
      <h1 className="mt-6 text-2xl font-semibold">{mode === "signin" ? "Careers admin" : "Reset password"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{mode === "signin" ? "Sign in with an authorized HR account." : "Enter your admin email and we'll send you a link to set a new password."}</p>
      {!isSupabaseConfigured ? <p role="alert" className="mt-5 text-sm text-destructive">Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p> :
        mode === "signin" ?
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm">Email<input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          <label className="block text-sm">Password<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
          <button type="button" onClick={() => switchMode("forgot")} className="w-full text-sm text-muted-foreground hover:text-foreground hover:underline">Forgot password?</button>
        </form> :
        <form className="mt-6 space-y-4" onSubmit={sendResetLink}>
          <label className="block text-sm">Email<input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
          {notice && <p role="status" className="text-sm text-foreground">{notice}</p>}
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{busy ? "Sending…" : "Send reset link"}</button>
          <button type="button" onClick={() => switchMode("signin")} className="w-full text-sm text-muted-foreground hover:text-foreground hover:underline">← Back to sign in</button>
        </form>}
    </section>
  </main>;
}
