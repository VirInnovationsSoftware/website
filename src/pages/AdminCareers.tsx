import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import AdminGuard from "@/components/admin/AdminGuard";
import { supabase } from "@/lib/supabase";

export default function AdminCareers() {
  return <AdminGuard>{session => <AdminCareersContent session={session} />}</AdminGuard>;
}

function AdminCareersContent({ session }: { session: Session }) {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase?.auth.signOut();
    navigate("/admin/login", { replace: true });
  };
  return <main className="min-h-screen bg-background px-6 py-12">
    <section className="mx-auto max-w-4xl rounded-xl border bg-card p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-semibold">Careers Management</h1><p className="mt-2 text-muted-foreground">Signed in as {session.user.email}</p></div>
        <button onClick={signOut} className="rounded-md border px-4 py-2">Sign out</button>
      </div>
    </section>
  </main>;
}
