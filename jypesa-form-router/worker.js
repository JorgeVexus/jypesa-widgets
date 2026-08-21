// JYPESA — Contact form router
// Receives a Webflow "form_submission" webhook, reads the Region field,
// and forwards the submission by email to the matching regional inbox via Resend.

// ---- Region -> destination email (internal routing list, confirmed by client) ----
// Keys are normalized (lowercase, accents stripped) so small differences in
// how the option is typed in the Webflow dropdown ("México" vs "Mexico")
// still match correctly. Both Spanish and English option labels are mapped,
// since the /contacto form uses Spanish options and the /en/contact form
// uses English options — both must resolve to the same regional inbox.
const REGION_TO_EMAIL = {
  "mexico": "cercadeti@jypesa.com",
  "caribe": "ventascaribe@jypesa.com",
  "caribbean": "ventascaribe@jypesa.com",
  "centroamerica": "centroamerica@jypesa.com",
  "central america": "centroamerica@jypesa.com",
  "peru": "ventasperu@jypesa.com",
  "colombia": "ventascolombia@jypesa.com",
  "chile": "ventaschile@jypesa.com",
  "usa": "contactusa@jypesa.com",
  "united states": "contactusa@jypesa.com",
  "europa": "contactoeu@jypesa.com",
  "europe": "contactoeu@jypesa.com",
};

const FALLBACK_EMAIL = "cercadeti@jypesa.com"; // used if Region is missing/unrecognized
const FROM_ADDRESS = "Formulario Jypesa <formulario@jypesa.com>"; // must be a verified Resend sender on jypesa.com

function normalize(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // strip accents (decomposed diacritical marks)
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // ---- Shared-secret check ----
    // Webflow's API-registered webhooks don't reliably expose a documented
    // signing scheme we could verify from here, so instead we protect the
    // endpoint with a random secret passed as a query param on the webhook
    // URL itself (e.g. ?key=xxxx). Only requests carrying the right key are
    // processed. Set WEBHOOK_SHARED_SECRET and use the same value in the
    // webhook URL when it's created.
    if (env.WEBHOOK_SHARED_SECRET) {
      const url = new URL(request.url);
      const key = (url.searchParams.get("key") || "").trim();
      const expected = env.WEBHOOK_SHARED_SECRET.trim();
      if (key !== expected) {
        // Temporary diagnostic (safe to leave off the actual secret): lengths
        // and last 4 chars only, to spot whitespace/truncation mismatches
        // without leaking the full value into logs.
        console.error("Auth mismatch:", {
          gotLength: key.length,
          expectedLength: expected.length,
          gotTail: key.slice(-4),
          expectedTail: expected.slice(-4),
        });
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const rawBody = await request.text();

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.error("Bad JSON body:", rawBody);
      return new Response("Bad JSON", { status: 400 });
    }

    // Webflow's form_submission webhook nests the actual field values under
    // payload.payload.data. Older/alternate shapes are checked as fallbacks.
    // Always logged below so you can confirm the real shape on first test
    // (Cloudflare dashboard -> Worker -> Logs, or `wrangler tail`).
    const submission =
      payload?.payload?.data ??
      payload?.data?.data ??
      payload?.data ??
      {};

    const formName =
      payload?.payload?.name ??
      payload?.data?.name ??
      payload?.name ??
      "Formulario de contacto";

    console.log("Incoming webhook:", JSON.stringify({ formName, submission, rawPayloadKeys: Object.keys(payload || {}) }));

    if (!env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set — run `wrangler secret put RESEND_API_KEY`.");
      return new Response("Server misconfigured", { status: 500 });
    }

    // Field is named "Region" in both contact forms (the Región select).
    const regionRaw = submission["Region"] ?? submission["Región"] ?? "";
    const toEmail = REGION_TO_EMAIL[normalize(regionRaw)] || FALLBACK_EMAIL;

    const html = renderSubmissionHtml(formName, regionRaw, submission);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [toEmail],
        reply_to: submission["email"] || undefined,
        subject: `Nueva solicitud de contacto — ${regionRaw || "Región no especificada"}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend error:", resendResponse.status, errText);
      return new Response("Email send failed", { status: 502 });
    }

    return new Response("OK", { status: 200 });
  },
};

function renderSubmissionHtml(formName, region, data) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 8px;font-weight:600;">${escapeHtml(key)}</td><td style="padding:4px 8px;">${escapeHtml(String(value ?? ""))}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;">
      <h2>${escapeHtml(formName)}</h2>
      <p>Región detectada: <strong>${escapeHtml(region || "N/A")}</strong></p>
      <table style="border-collapse:collapse;">${rows}</table>
    </div>
  `;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
