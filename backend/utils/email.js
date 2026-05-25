import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

// Simple HTML escape to avoid injecting raw HTML from user input
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Send via Brevo (formerly Sendinblue) HTTP API when BREVO_API_KEY is provided
const sendViaBrevo = async (options) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('BREVO_API_KEY not configured');

  // derive sender name/email from EMAIL_FROM or BREVO_FROM or EMAIL_USER
  const rawFrom = (process.env.BREVO_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || '').replace(/^"|"$/g, '').trim();
  let sender = { email: rawFrom, name: undefined };
  const m = rawFrom.match(/^(.*)<(.+@.+)>$/);
  if (m) {
    sender = { name: m[1].trim().replace(/^"|"$/g, '').trim(), email: m[2].trim() };
  }

  const toList = Array.isArray(options.to) ? options.to : [options.to];

  const payload = {
    sender,
    to: toList.map((t) => ({ email: String(t) })),
    subject: options.subject,
    textContent: options.text,
    htmlContent: options.html
  };

  if (options.replyTo) payload.replyTo = { email: options.replyTo };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.text();
    const err = new Error(`Brevo error ${res.status}: ${body}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
};

// Send email
export const sendEmail = async (options) => {
  return sendViaBrevo(options);
};

// Send contact form notification
export const sendContactNotification = async (contact) => {
  const text = `New Contact Form Submission\n\nFrom: ${contact.email}\n\nMessage:\n${contact.message}\n\nSubmitted at: ${new Date().toLocaleString()}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <p><strong>From:</strong> ${escapeHtml(contact.email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(contact.message)}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This email was sent from the XyroSolutions contact form.
      </p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'xyrosolutions1@gmail.com',
    replyTo: contact.email,
    subject: `New Contact: ${contact.email}`,
    text,
    html
  });
};
