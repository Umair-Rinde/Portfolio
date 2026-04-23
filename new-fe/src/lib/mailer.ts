import nodemailer from "nodemailer";

type MailerConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

function getMailerConfig(): MailerConfig | null {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !portRaw || !user || !pass || !from) return null;

  const port = Number(portRaw);
  if (!Number.isFinite(port)) return null;

  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  return { host, port, secure, user, pass, from };
}

export async function sendOtpEmail(params: { to: string; code: string; minutesValid: number }) {
  const cfg = getMailerConfig();
  if (!cfg) {
    // Treat as configuration error for production; caller can decide behavior in dev.
    throw new Error("SMTP not configured");
  }

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });

  const subject = "Your admin login code";
  const text = `Your OTP code is: ${params.code}\n\nIt expires in ${params.minutesValid} minutes.\n\nIf you did not request this, you can ignore this email.`;
  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5">
      <h2 style="margin: 0 0 12px">Admin login code</h2>
      <p style="margin: 0 0 12px">Use this OTP to sign in:</p>
      <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 12px; display: inline-block">
        ${params.code}
      </div>
      <p style="margin: 12px 0 0; color: #6b7280">Expires in ${params.minutesValid} minutes.</p>
    </div>
  `;

  await transporter.sendMail({
    from: cfg.from,
    to: params.to,
    subject,
    text,
    html,
  });
}

