/**
 * Adds an email to the Matchday list on Beehiiv.
 *
 * The signup form on the site posts here rather than to Beehiiv directly, so
 * the API key never reaches the browser. Beehiiv's free plan includes this
 * endpoint (it excludes only the Send API).
 *
 * Needs BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID (starts with "pub_") in the
 * environment. Until they are set, this answers 503 and the form says signups
 * aren't open yet, rather than pretending it worked.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Trimmed: a key pasted into the Vercel dashboard easily picks up a stray
  // space or newline, which Beehiiv rejects as INVALID_API_KEY.
  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  if (!apiKey || !publicationId) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const { email } = await request.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "austin-armstrong.me",
        referring_site: request.headers.get("referer") ?? "https://austin-armstrong.me/matchday",
      }),
    },
  );

  if (!res.ok) {
    console.error(`[matchday-subscribe] beehiiv ${res.status}: ${await res.text()}`);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
