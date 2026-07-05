import { supabase } from "@/integrations/supabase/client";

type FormSource = "contato" | "investidores" | "carta_exclusividade";

interface SubmissionData {
  source: FormSource;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
  ticket?: string;
  area?: string;
}

export async function submitContactForm(data: SubmissionData) {
  const { error } = await supabase
    .from("contact_submissions")
    .insert([{
      source: data.source,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message || null,
      company: data.company || null,
      ticket: data.ticket || null,
      area: data.area || null,
    }]);

  if (error) throw error;
}
