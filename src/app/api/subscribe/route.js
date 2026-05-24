import { Resend } from 'resend';

export async function POST(req) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return Response.json(
      { error: 'Subscriptions are not configured yet. Please try again later.' },
      { status: 503 }
    );
  }

  let email;
  try {
    const body = await req.json();
    email = (body.email || '').trim().toLowerCase();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      // Already subscribed → friendly message
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('already') || msg.includes('exists')) {
        return Response.json({
          success: true,
          message: "You're already subscribed — thanks!",
        });
      }
      return Response.json(
        { error: error.message || 'Something went wrong.' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "You're subscribed. I'll let you know when the next post is up.",
    });
  } catch (e) {
    return Response.json(
      { error: e?.message || 'Unexpected error. Please try again.' },
      { status: 500 }
    );
  }
}
