import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    family: 4,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
export const sendEmail = async (options) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
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
    console.error('Error sending email:', err && err.message ? err.message : err);
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
        <p><strong>From:</strong> ${contact.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${contact.message}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This email was sent from the XyroSolutions contact form.
      </p>
    </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'xyrosolutions.1@gmail.com',
    replyTo: contact.email,
    subject: `New Contact: ${contact.email}`,
    text,
    html
  });
};
