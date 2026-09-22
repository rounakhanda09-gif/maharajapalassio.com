import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  eventType: z.string().trim().max(60).optional().or(z.literal("")),
  preferredDate: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Abuse guard: cap repeat submissions from the same number.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("event_enquiries")
      .select("id", { count: "exact", head: true })
      .eq("phone", data.phone)
      .gte("created_at", since);

    if ((count ?? 0) >= 3) {
      return {
        ok: false as const,
        error: "We've already received your enquiry. Our team will call you shortly.",
      };
    }

    const { error } = await supabaseAdmin.from("event_enquiries").insert({
      name: data.name,
      phone: data.phone,
      event_type: data.eventType || null,
      preferred_date: data.preferredDate || null,
      message: data.message || null,
    });

    if (error) {
      console.error("Failed to store event enquiry", error);
      return { ok: false as const, error: "We couldn't save your enquiry. Please call us instead." };
    }

    return { ok: true as const };
  });
