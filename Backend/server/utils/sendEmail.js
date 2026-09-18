import nodemailer from "nodemailer";

// ======================================================
// sendEmail
// Generic reusable email sender using SMTP credentials
// from environment variables. Works with Gmail App
// Passwords out of the box; swap EMAIL_HOST/PORT for
// any other SMTP provider (SendGrid, Mailtrap, etc.)
// without changing this file.
// ======================================================
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true, // true for port 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NextTech" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;