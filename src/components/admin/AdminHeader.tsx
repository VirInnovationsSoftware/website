import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const TABS = [
  { to: "/admin/careers", label: "Careers" },
  { to: "/admin/messages", label: "Messages" },
];

export default function AdminHeader({ title, session, actions }: { title: string; session: Session; actions?: ReactNode }) {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase?.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return <section className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
    <nav className="mb-6 flex gap-1 border-b">
      {TABS.map(tab => <NavLink key={tab.to} to={tab.to} className={({ isActive }) =>
        `-mb-px border-b-2 px-4 py-2 text-sm font-medium ${isActive ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`
      }>{tab.label}</NavLink>)}
    </nav>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-semibold">{title}</h1><p className="mt-2 text-muted-foreground">Signed in as {session.user.email}</p></div>
      <div className="flex gap-3">
        {actions}
        <button onClick={signOut} className="rounded-md border px-4 py-2">Sign out</button>
      </div>
    </div>
  </section>;
}
