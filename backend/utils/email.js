import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
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
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

// Send contact form notification
export const sendContactNotification = async (contact) => {
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
        This email was sent from the NexGen Studio contact form.
      </p>
    </div>
  `;

  return sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Contact: ${contact.email}`,
    html
  });
};
