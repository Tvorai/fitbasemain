import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStringField(obj: Record<string, unknown>, key: string): string | null {
  const value = obj[key];
  return typeof value === "string" && value.trim() ? value : null;
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ message: "Chýba Stripe konfigurácia." }, { status: 500 });
  }
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ message: "Chýba Supabase konfigurácia." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ message: "Chýba stripe-signature." }, { status: 400 });
  }

  const rawBody = Buffer.from(await request.arrayBuffer());
  const stripe = new Stripe(stripeSecretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata || {};
  const bookingId = metadata.booking_id;

  if (typeof bookingId !== "string" || !bookingId.trim()) {
    return NextResponse.json({ message: "Chýba booking_id v metadata." }, { status: 400 });
  }

  const stripePaymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : null;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const update: Record<string, string | null> = {
    payment_status: "paid",
    booking_status: "confirmed",
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: stripePaymentIntentId,
  };

  const updateRes = await supabase
    .from("bookings")
    .update(update)
    .eq("id", bookingId)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (updateRes.error) {
    return NextResponse.json({ message: updateRes.error.message }, { status: 500 });
  }
  if (!updateRes.data?.id) {
    return NextResponse.json({ message: "Booking sa nenašiel." }, { status: 404 });
  }

  const meta: Record<string, unknown> = isRecord(session.metadata) ? session.metadata : {};
  const trainerId = getStringField(meta, "trainer_id");
  const serviceType = getStringField(meta, "service_type");

  return NextResponse.json({ received: true, booking_id: bookingId, trainer_id: trainerId, service_type: serviceType });
}
