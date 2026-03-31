import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function pickStripeSecretKey(): string | null {
  return (
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_API_KEY ||
    process.env.STRIPE_SECRET ||
    null
  );
}

function stripeErrorMessage(payload: unknown): string | null {
  if (!isRecord(payload)) return null;
  const err = payload.error;
  if (!isRecord(err)) return null;
  const msg = err.message;
  return typeof msg === "string" && msg.trim() ? msg : null;
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const stripeSecretKey = pickStripeSecretKey();

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ ok: false, message: "Chýba konfigurácia Supabase." }, { status: 500 });
  }
  if (!stripeSecretKey) {
    return NextResponse.json({ ok: false, message: "Chýba STRIPE_SECRET_KEY." }, { status: 500 });
  }

  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const userRes = await supabase.auth.getUser(token);
  const user = userRes.data.user;
  if (!user) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const trainerRes = await supabase
    .from("trainers")
    .select("id, stripe_account_id")
    .eq("profile_id", user.id)
    .maybeSingle<{ id: string; stripe_account_id: string | null }>();

  if (trainerRes.error) {
    return NextResponse.json({ ok: false, message: trainerRes.error.message }, { status: 500 });
  }
  if (!trainerRes.data?.id) {
    return NextResponse.json({ ok: false, message: "Používateľ nie je tréner." }, { status: 403 });
  }

  if (trainerRes.data.stripe_account_id) {
    return NextResponse.json({ ok: true, stripe_account_id: trainerRes.data.stripe_account_id });
  }

  const form = new URLSearchParams();
  form.set("type", "express");
  form.set("capabilities[card_payments][requested]", "true");
  form.set("capabilities[transfers][requested]", "true");
  if (typeof user.email === "string" && user.email.trim()) {
    form.set("email", user.email.trim());
  }

  const stripeRes = await fetch("https://api.stripe.com/v1/accounts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const stripePayload: unknown = await stripeRes.json().catch(() => null);
  if (!stripeRes.ok) {
    return NextResponse.json(
      { ok: false, message: stripeErrorMessage(stripePayload) || "Stripe error." },
      { status: 500 }
    );
  }

  const accountId =
    isRecord(stripePayload) && typeof stripePayload.id === "string" && stripePayload.id.trim()
      ? stripePayload.id
      : null;

  if (!accountId) {
    return NextResponse.json({ ok: false, message: "Stripe nevrátil account id." }, { status: 500 });
  }

  const updateRes = await supabase
    .from("trainers")
    .update({
      stripe_account_id: accountId,
      stripe_onboarding_completed: false,
      stripe_charges_enabled: false,
      stripe_payouts_enabled: false,
    })
    .eq("id", trainerRes.data.id);

  if (updateRes.error) {
    return NextResponse.json({ ok: false, message: updateRes.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stripe_account_id: accountId });
}
