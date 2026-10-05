import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AdminGuardProps = { children: (session: Session) => React.ReactNode };

export default function AdminGuard({ children }: AdminGuardProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let active = true;
    const checkSession = async (nextSession: Session | null) => {
      setSession(nextSession);
      if (!nextSession) {
        if (active) { setAuthorized(false); setLoading(false); }
        return;
      }
      const { data, error } = await supabase
        .from("admin_memberships")
        .select("user_id")
        .eq("user_id", nextSession.user.id)
        .maybeSingle();
      if (active) {
        setAuthorized(!error && Boolean(data));
        setLoading(false);
      }
    };
    supabase.auth.getSession().then(({ data }) => checkSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      void checkSession(next);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  if (!isSupabaseConfigured) return <AdminMessage message="Supabase is not configured. Add the public Supabase URL and anon key to the local environment." />;
  if (loading) return <AdminMessage message="Checking admin access…" />;
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!authorized) return <AdminMessage message="This account is not authorized to manage careers." />;
  return <>{children(session)}</>;
}

function AdminMessage({ message }: { message: string }) {
  return <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
    <p className="text-lg">{message}</p>
    <Link className="text-primary underline" to="/">Return to home</Link>
  </main>;
}
