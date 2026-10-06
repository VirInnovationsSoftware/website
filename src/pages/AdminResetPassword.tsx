import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const MIN_PASSWORD_LENGTH = 8;

// Opened from the "reset password" email. Supabase reads the token in the link,
// signs the user in for this one purpose, and we let them choose a new password.
export default function AdminResetPassword() {
  const [state, setState] = useState<"checking" | "ready" | "invalid" | "done">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) { setState("invalid"); return; }
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setState(prev => prev === "checking" ? "ready" : prev);
    });
    // getSession waits until the token in the link has been processed.
    supabase.auth.getSession().then(({ data }) => {
      setState(prev => prev === "checking" ? (data.session ? "ready" : "invalid") : prev);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    if (password.length < MIN_PASSWORD_LENGTH) { setMessage(`Use at least ${MIN_PASSWORD_LENGTH} characters.`); return; }
    if (password !== confirm) { setMessage("The two passwords don't match."); return; }
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setMessage(error.message);
    else setState("done");
  };

  if (state === "done") return <Navigate to="/admin/careers" replace />;

  return <main className="min-h-screen flex items-center justify-center bg-background px-4">
    <section className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
      <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-foreground">← Back to sign in</Link>
      <h1 className="mt-6 text-2xl font-semibold">Set a new password</h1>
      {state === "checking" && <p className="mt-4 text-sm text-muted-foreground">Checking your reset link…</p>}
      {state === "invalid" && <p role="alert" className="mt-4 text-sm text-destructive">This reset link is invalid or has expired. Go back to sign in and use "Forgot password?" to get a new one.</p>}
      {state === "ready" &&
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm">New password<input required type="password" autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          <label className="block text-sm">Confirm new password<input required type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
          {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{busy ? "Saving…" : "Save new password"}</button>
        </form>}
    </section>
  </main>;
}
