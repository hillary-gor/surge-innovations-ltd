import transporter from "../nodemailer";

const SENDER = `"Surge Innovations" <${process.env.EMAIL_FROM}>`;
const ADMIN_EMAIL = process.env.EMAIL_ADMIN || "admin@surgeinnovations.org"; // Where alerts go
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const LOGO_URL = `${BASE_URL}/logo/Surge Dark Bg Logo.png`;

// --- LAYOUT WRAPPER ---
// Uses a clean, corporate "Surge Blue" theme
const wrapWithLayout = (previewText: string, contentHtml: string) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .container { margin: 0 auto; max-width: 600px; padding: 40px 20px; }
        .main { background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
        h2 { color: #0f172a; margin-top: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
        p { color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
        .btn-container { margin: 30px 0; text-align: center; }
        .btn { background-color: #2563eb; color: #ffffff !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
        .btn:hover { background-color: #1d4ed8; }
        .footer { text-align: center; font-size: 13px; color: #94a3b8; margin-top: 30px; }
        .details-box { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
        .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
        .value { color: #0f172a; font-weight: 500; font-size: 15px; }
        .divider { height: 1px; background-color: #e2e8f0; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="text-align: center; margin-bottom: 30px;">
           <img src="${LOGO_URL}" alt="Surge Innovations" width="50" height="50" style="border-radius: 8px;">
        </div>
        <div class="main">
          ${contentHtml}
        </div>
        <div class="footer">
          <p style="font-size: 12px; margin-bottom: 8px;">Strategy, Code & Scalable Impact.</p>
          <p>© ${new Date().getFullYear()} Surge Innovations Ltd. Nairobi, Kenya.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

/**
 * 1. CLIENT AUTO-REPLY (When they send a message)
 */
export const sendContactConfirmation = async (email: string, name: string) => {
  const html = `
    <h2>Message Received</h2>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to Surge Innovations. We have received your inquiry and a member of our technical team will review it shortly.</p>
    <p>We typically reply within 24 hours.</p>
    
    <div class="divider"></div>
    
    <p style="font-size: 14px; color: #64748b;">
      While you wait, you can review our latest pricing packages or schedule a direct consultation below.
    </p>
    
    <div class="btn-container">
      <a href="${BASE_URL}/pricing" class="btn">View Packages</a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SENDER,
      to: email,
      subject: `We received your message - Surge Innovations`,
      html: wrapWithLayout("We received your message", html),
    });
    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error };
  }
};

/**
 * 2. ADMIN ALERT (New Lead / Quote Request)
 */
export const sendAdminLeadAlert = async (data: {
  name: string;
  email: string;
  phone?: string;
  plan?: string;
  message: string;
  budget?: string;
}) => {
  const html = `
    <h2 style="color: #2563eb;">🚀 New Lead Alert</h2>
    <p>A new potential client has submitted an inquiry via the website.</p>
    
    <div class="details-box">
      <div style="margin-bottom: 15px;">
        <span class="label">Client Name</span>
        <div class="value">${data.name}</div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <span class="label">Email Address</span>
        <div class="value"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></div>
      </div>

      ${data.phone ? `
      <div style="margin-bottom: 15px;">
        <span class="label">Phone Number</span>
        <div class="value">${data.phone}</div>
      </div>` : ''}

      ${data.plan ? `
      <div style="margin-bottom: 15px;">
        <span class="label">Interested Plan</span>
        <div class="value" style="color: #0d9488; font-weight: bold;">${data.plan}</div>
      </div>` : ''}

      <div class="divider"></div>

      <div>
        <span class="label">Message Content</span>
        <p style="margin-top: 5px; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>

    <div class="btn-container">
      <a href="mailto:${data.email}?subject=Re: Your Project Inquiry - Surge Innovations" class="btn">Reply to Client</a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SENDER,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[LEAD] ${data.plan ? data.plan + ' - ' : ''}${data.name}`,
      html: wrapWithLayout("New Website Inquiry", html),
    });
    return { success: true };
  } catch (error) {
    console.error("Admin Alert Error:", error);
    return { success: false, error };
  }
};

/**
 * 3. PLAN SELECTION / ONBOARDING START
 * Sent when a user selects a plan (e.g., "Business Starter") from the pricing page form.
 */
export const sendPlanSelectionConfirmation = async (
  email: string, 
  name: string, 
  planName: string,
  price: string
) => {
  const html = `
    <h2>Let's Build Your Platform</h2>
    <p>Hi ${name},</p>
    <p>Excellent choice. We have received your request to start the <strong>${planName}</strong> plan.</p>
    
    <div class="details-box">
       <span class="label">Selected Package</span>
       <div class="value" style="font-size: 18px; margin-bottom: 8px;">${planName}</div>
       
       <span class="label">Annual Investment</span>
       <div class="value">${price} / Year</div>
    </div>

    <h3>Next Steps:</h3>
    <ol style="color: #475569; padding-left: 20px; margin-bottom: 30px;">
      <li style="margin-bottom: 10px;">Our technical lead will review your requirements.</li>
      <li style="margin-bottom: 10px;">We will send you a formal Invoice & Service Agreement.</li>
      <li style="margin-bottom: 10px;">Once signed, we begin development immediately.</li>
    </ol>

    <p>If you have any specific design assets (Logo, Colors) ready, you can reply to this email with them directly.</p>

    <div class="btn-container">
      <a href="${BASE_URL}/dashboard" class="btn">Track Status</a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SENDER,
      to: email,
      subject: `Project Initiation: ${planName}`,
      html: wrapWithLayout("Project Initiation", html),
    });
    return { success: true };
  } catch (error) {
    console.error("Plan Confirmation Error:", error);
    return { success: false, error };
  }
};