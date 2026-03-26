// emailService.ts

type EmailParams = {
  to: string;
  subject: string;
  html: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function sendEmail({ to, subject, html }: EmailParams): Promise<{ success: boolean }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Fitbase <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.warn("[Email Service] RESEND_API_KEY chýba, email preskakujem.");
    return { success: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const payload: unknown = await res.json().catch(() => null);
      const details = isRecord(payload) && typeof payload.message === "string" ? payload.message : `HTTP ${res.status}`;
      console.warn(`[Email Service] Resend zlyhal: ${details}`);
      return { success: false };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn(`[Email Service] Resend request zlyhal: ${message}`);
    return { success: false };
  }
}

/**
 * Šablóna pre potvrdzovací email pre klienta.
 */
export function getClientConfirmationEmailHtml(
  clientName: string,
  dateStr: string,
  trainerName: string,
  trainerEmail?: string | null,
  serviceName?: string | null
) {
  return `
    <h1>Potvrdenie rezervácie</h1>
    <p>Ahoj ${clientName},</p>
    <p>Tvoja rezervácia${serviceName ? ` (<strong>${serviceName}</strong>)` : ``} na termín <strong>${dateStr}</strong> u trénera <strong>${trainerName}</strong> bola úspešne prijatá.</p>
    ${trainerEmail ? `<p>Kontakt na trénera: <strong>${trainerEmail}</strong></p>` : ``}
    <p>Tešíme sa na teba!</p>
    <p>Tím Fitbase</p>
  `;
}

/**
 * Šablóna pre notifikačný email pre admina (trénera).
 */
export function getAdminNotificationEmailHtml(
  clientName: string,
  clientEmail: string,
  clientPhone: string | null,
  dateStr: string,
  note: string | null,
  serviceName?: string | null
) {
  return `
    <h1>Nová rezervácia</h1>
    <p>Máte novú rezerváciu od klienta <strong>${clientName}</strong>.</p>
    ${serviceName ? `<p><strong>Služba:</strong> ${serviceName}</p>` : ``}
    <p><strong>Termín:</strong> ${dateStr}</p>
    <p><strong>Email:</strong> ${clientEmail}</p>
    <p><strong>Telefón:</strong> ${clientPhone || 'neuvedené'}</p>
    <p><strong>Poznámka:</strong> ${note || 'žiadna'}</p>
    <p>Rezerváciu nájdete vo svojom dashboarde.</p>
  `;
}
