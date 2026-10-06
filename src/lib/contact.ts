export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  handled: boolean;
  created_at: string;
};

export type NewContactMessage = Pick<ContactMessage, "name" | "email" | "message"> & { phone: string };

export async function sendContactMessage({ name, email, phone, message }: NewContactMessage) {
  // Imported on demand, like the jobs list, to keep Supabase out of the first page load.
  const { supabase } = await import("@/lib/supabase");
  if (!supabase) throw new Error("The contact form is not available right now.");

  // Plain insert (no .select()): visitors may add messages but never read them back.
  const { error } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim() || null,
    message: message.trim(),
  });
  if (error) throw new Error(error.code === "P0001" ? error.message : "Your message could not be sent. Please try again.");
}
