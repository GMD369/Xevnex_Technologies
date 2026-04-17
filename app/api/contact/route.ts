import { supabase } from "@/lib/supabase";

const emailPattern = /\S+@\S+\.\S+/;

type ContactPayload = {
  company?: string;
  email: string;
  message: string;
  name: string;
  budget?: string;
  project_type?: string[];
  timeline?: string;
};

async function getPayload(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as ContactPayload;
  }

  const formData = await request.formData();

  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
  };
}

export async function POST(request: Request) {
  const payload = await getPayload(request);

  // ── Validate required fields ──────────────────────────────────────────────
  if (
    !payload.name.trim() ||
    !payload.message.trim() ||
    !emailPattern.test(payload.email)
  ) {
    return Response.json(
      { ok: false, error: "Please provide a valid name, email, and message." },
      { status: 400 },
    );
  }

  // ── Save to Supabase ──────────────────────────────────────────────────────
  const { error } = await supabase.from("contact_submissions").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    company: payload.company?.trim() || null,
    message: payload.message.trim(),
    budget: payload.budget?.trim() || null,
    project_type: payload.project_type ?? [],
    timeline: payload.timeline?.trim() || null,
  });

  if (error) {
    console.error("[contact/route] Supabase insert error:", error.message);
    return Response.json(
      { ok: false, error: "Failed to save your message. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    message: "Inquiry received.",
  });
}
