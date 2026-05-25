import dns from 'dns';
import nodemailer from 'nodemailer';

dns.setDefaultResultOrder('ipv4first');

// Simple HTML escape to avoid injecting raw HTML from user input
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Create transporter
const createTransporter = async () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = process.env.EMAIL_SECURE
    ? process.env.EMAIL_SECURE === 'true'
    : port === 465;

  const resolvedHost = host === 'smtp.gmail.com'
    ? (await dns.promises.lookup(host, { family: 4 })).address
    : host;

  return nodemailer.createTransport({
    host: resolvedHost,
    port,
    secure,
    family: 4,
    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,
    tls: {
      servername: host
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
export const sendEmail = async (options) => {
  const transporter = await createTransporter();

  // Trim surrounding quotes if user put the value in quotes in .env
  const fromAddress = (process.env.EMAIL_FROM || process.env.EMAIL_USER || '')
    .replace(/^"|"$/g, '')
    .trim();

  const mailOptions = {
    from: fromAddress,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', { messageId: info.messageId, to: mailOptions.to });
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
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
