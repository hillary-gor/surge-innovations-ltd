import { transporter, baseEmailStyle } from "@/lib/nodemailer";

const DASHBOARD_URL = "https://surgeinnovations.org/dashboard/client";

// Helper for the common HTML wrapper
const wrapHtml = (content: string) => `
  <div style="${baseEmailStyle} background-color: #f8fafc; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <h2 style="color: #0f172a; margin-top: 0;">Surge Innovations</h2>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      ${content}
      <div style="margin-top: 30px; text-align: center;">
        <a href="${DASHBOARD_URL}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Open Dashboard
        </a>
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
        You are receiving this email because you are a client of Surge Innovations.
      </p>
    </div>
  </div>
`;

export async function sendProjectCreatedEmail(
  toEmail: string, 
  clientName: string, 
  projectName: string
) {
  const html = wrapHtml(`
    <p>Hi ${clientName},</p>
    <p>We are excited to inform you that we have officially started work on your new project: <strong>${projectName}</strong>.</p>
    <p>You can track our progress, view milestones, and communicate with the team directly via your client dashboard.</p>
  `);

  await transporter.sendMail({
    from: `"Surge Project Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🚀 Project Started: ${projectName}`,
    html,
  });
}

export async function sendStatusUpdateEmail(
  toEmail: string, 
  clientName: string, 
  projectName: string,
  oldStatus: string,
  newStatus: string
) {
  const formatStatus = (s: string) => s.replace("_", " ").toUpperCase();
  
  const html = wrapHtml(`
    <p>Hi ${clientName},</p>
    <p>The status of your project <strong>${projectName}</strong> has changed.</p>
    <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
      <span style="color: #64748b; text-decoration: line-through;">${formatStatus(oldStatus)}</span>
      <span style="margin: 0 10px;">→</span>
      <strong style="color: #0f172a;">${formatStatus(newStatus)}</strong>
    </div>
    <p>Log in to your dashboard to see the latest details.</p>
  `);

  await transporter.sendMail({
    from: `"Surge Project Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🔄 Status Update: ${projectName}`,
    html,
  });
}

export async function sendTimelineUpdateEmail(
  toEmail: string, 
  clientName: string, 
  projectName: string,
  updateTitle: string,
  updateDescription: string
) {
  const html = wrapHtml(`
    <p>Hi ${clientName},</p>
    <p>A new update has been posted to the timeline for <strong>${projectName}</strong>.</p>
    <div style="border-left: 4px solid #3b82f6; background-color: #eff6ff; padding: 15px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #1e40af;">${updateTitle}</h3>
      <p style="margin-bottom: 0; color: #1e3a8a;">${updateDescription}</p>
    </div>
  `);

  await transporter.sendMail({
    from: `"Surge Project Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `📝 New Update: ${updateTitle}`,
    html,
  });
}