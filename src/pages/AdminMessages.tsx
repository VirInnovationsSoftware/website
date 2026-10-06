import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import { toast } from "sonner";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { supabase } from "@/lib/supabase";
import type { ContactMessage } from "@/lib/contact";

type Filter = "new" | "handled";

export default function AdminMessages() {
  return <AdminGuard>{session => <AdminMessagesContent session={session} />}</AdminGuard>;
}

function AdminMessagesContent({ session }: { session: Session }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("new");

  const loadMessages = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (error) toast.error(error.message);
    else setMessages(data);
  }, []);

  useEffect(() => { void loadMessages(); }, [loadMessages]);

  const setHandled = async (message: ContactMessage, handled: boolean) => {
    if (!supabase) return;
    const { error } = await supabase.from("contact_messages").update({ handled }).eq("id", message.id);
    if (error) toast.error(error.message);
    else void loadMessages();
  };

  const deleteMessage = async (message: ContactMessage) => {
    if (!supabase || !window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", message.id);
    if (error) toast.error(error.message);
    else { toast.success("Message deleted."); void loadMessages(); }
  };

  const newCount = messages.filter(m => !m.handled).length;
  const shown = messages.filter(m => m.handled === (filter === "handled"));

  return <main className="min-h-screen bg-background px-4 py-12 md:px-6">
    <div className="mx-auto max-w-5xl space-y-6">
      <AdminHeader title="Messages" session={session} />

      <div className="flex gap-2 text-sm">
        {([["new", `New (${newCount})`], ["handled", `Handled (${messages.length - newCount})`]] as const).map(([value, label]) =>
          <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-1.5 ${filter === value ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}>{label}</button>)}
      </div>

      <section className="rounded-xl border bg-card shadow-sm">
        {loading ? <p className="p-8 text-center text-muted-foreground">Loading messages…</p> :
          shown.length === 0 ? <p className="p-8 text-center text-muted-foreground">{filter === "new" ? "No new messages." : "No handled messages yet."}</p> :
          <ul className="divide-y">
            {shown.map(message => <li key={message.id} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold">{message.name}</h2>
                <time dateTime={message.created_at} className="text-xs text-muted-foreground">{format(new Date(message.created_at), "d MMM yyyy, h:mm a")}</time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                <a href={`mailto:${message.email}`} className="hover:text-foreground hover:underline">{message.email}</a>
                {message.phone && <> · <a href={`tel:${message.phone}`} className="hover:text-foreground hover:underline">{message.phone}</a></>}
              </p>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">{message.message}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <a href={`mailto:${message.email}?subject=${encodeURIComponent("Re: your message to Militros")}`} className="rounded-md border px-3 py-1.5 hover:bg-muted">Reply by email</a>
                {message.handled
                  ? <button onClick={() => setHandled(message, false)} className="rounded-md border px-3 py-1.5 hover:bg-muted">Mark as new</button>
                  : <button onClick={() => setHandled(message, true)} className="rounded-md border px-3 py-1.5 hover:bg-muted">Mark handled</button>}
                <button onClick={() => deleteMessage(message)} className="rounded-md border px-3 py-1.5 text-destructive hover:bg-destructive/10">Delete</button>
              </div>
            </li>)}
          </ul>}
      </section>
    </div>
  </main>;
}
