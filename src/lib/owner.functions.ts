import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "closed"]),
});

const noteSchema = z.object({
  id: z.string().uuid(),
  note: z.string().trim().max(2000),
});

export const listEnquiries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("event_enquiries")
      .select("id, name, phone, event_type, preferred_date, message, status, staff_note, created_at")
      .order("created_at", { ascending: false })
      .limit(300);

    if (error) {
      console.error("Failed to list enquiries", error);
      return { ok: false as const, enquiries: [] };
    }
    return { ok: true as const, enquiries: data ?? [] };
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => statusSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("event_enquiries")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) {
      console.error("Failed to update enquiry status", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });

export const setEnquiryNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => noteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("event_enquiries")
      .update({ staff_note: data.note || null })
      .eq("id", data.id);

    if (error) {
      console.error("Failed to save enquiry note", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
