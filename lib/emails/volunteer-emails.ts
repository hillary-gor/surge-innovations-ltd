export function generateVolunteerAckEmail(firstName: string, level: string) {
  // Map the internal level code to a pretty label
  const levelLabels: Record<string, string> = {
    beginner: "Beginner (Learning Track)",
    intermediate: "Intermediate (Contributor Track)",
    advanced: "Advanced (Lead Track)",
  };

  const prettyLevel = levelLabels[level] || level;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
    .header { background: #000000; padding: 30px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none; letter-spacing: -0.5px; }
    .content { padding: 40px 30px; color: #374151; line-height: 1.6; }
    .h1 { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 20px; }
    .highlight-box { background-color: #f3f4f6; border-left: 4px solid #000000; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .level-badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .steps { margin: 30px 0; padding: 0; list-style: none; }
    .step-item { display: flex; margin-bottom: 20px; }
    .step-number { width: 28px; height: 28px; background: #000000; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
    .step-text h4 { margin: 0 0 4px 0; font-size: 16px; color: #111827; }
    .step-text p { margin: 0; font-size: 14px; color: #6b7280; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .button { display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SURGE INNOVATIONS</div>
    </div>
    
    <div class="content">
      <div class="h1">Application Received, ${firstName}!</div>
      
      <p>Thanks for raising your hand to join the Surge Volunteer Program. We have successfully received your application for the following track:</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <span class="level-badge">${prettyLevel}</span>
      </div>

      <p>We are currently reviewing your profile to see if your skills and availability align with our current project needs.</p>

      <div class="highlight-box">
        <strong>What happens next?</strong><br/>
        Our team reviews applications on a rolling basis. You can expect a response within <strong>3-5 business days</strong>.
      </div>

      <ul class="steps">
        <li class="step-item">
          <div class="step-number">1</div>
          <div class="step-text">
            <h4>Application Review</h4>
            <p>We check your GitHub/Portfolio and motivation statement.</p>
          </div>
        </li>
        <li class="step-item">
          <div class="step-number">2</div>
          <div class="step-text">
            <h4>Quick Chat</h4>
            <p>If matched, we'll invite you for a 15-min Google Meet.</p>
          </div>
        </li>
        <li class="step-item">
          <div class="step-number">3</div>
          <div class="step-text">
            <h4>Onboarding</h4>
            <p>You get access to Slack, Jira, and the codebase.</p>
          </div>
        </li>
      </ul>

      <p>In the meantime, feel free to check out our open source public repositories or read our latest case studies.</p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://surgeinnovations.org/case-studies" class="button">View Recent Work</a>
      </div>
    </div>

    <div class="footer">
      &copy; ${new Date().getFullYear()} Surge Innovations Ltd. Nairobi, Kenya.<br/>
      This is an automated message. Please do not reply directly.
    </div>
  </div>
</body>
</html>
  `;
}

export function generateDecisionEmail(firstName: string, status: "accepted" | "rejected", role: string) {
  const isAccepted = status === "accepted";
  
  // Use similar pretty labels for the decision email
  const roleLabels: Record<string, string> = {
    beginner: "Beginner Developer",
    intermediate: "Junior Developer",
    advanced: "Senior/Lead Developer",
  };
  const prettyRole = roleLabels[role] || role;

  const subject = isAccepted 
    ? "🎉 Welcome to the Team! - Surge Innovations" 
    : "Update regarding your application - Surge Innovations";

  // Dynamic Content Logic
  const heading = isAccepted 
    ? `Congratulations, ${firstName}!` 
    : `Hi ${firstName},`;

  const headingColor = isAccepted ? "#16a34a" : "#111827";

  const mainBody = isAccepted 
    ? `
      <p>We are thrilled to accept you into the Surge Volunteer Program!</p>
      <p>Your background stood out to us, and we believe you will be a great addition to the team as a <strong>${prettyRole}</strong>.</p>
      
      <div class="highlight-box" style="border-left-color: #16a34a; background-color: #f0fdf4;">
        <strong style="color: #15803d;">Next Steps:</strong>
        <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #166534;">
          <li style="margin-bottom: 5px;">Watch your inbox for a Slack invitation.</li>
          <li style="margin-bottom: 5px;">We will schedule a kickoff call this week.</li>
          <li>Review the "Getting Started" guide on the dashboard.</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://surgeinnovations.org/dashboard" class="button" style="background-color: #16a34a;">Go to Dashboard</a>
      </div>
    ` 
    : `
      <p>Thank you so much for your interest in Surge Innovations and for taking the time to apply for the <strong>${prettyRole}</strong> position.</p>
      <p>We received many qualified applications this cycle. After careful review, we are unfortunately <strong>not able to move forward</strong> with your application at this time.</p>
      <p>This was a difficult decision, but we encourage you to apply again in the future as you gain more experience or as new tracks open up.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://surgeinnovations.org/careers" class="button" style="background-color: #4b5563;">View Other Openings</a>
      </div>
    `;

  return {
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
    .header { background: #000000; padding: 30px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none; letter-spacing: -0.5px; }
    .content { padding: 40px 30px; color: #374151; line-height: 1.6; }
    .h1 { font-size: 22px; font-weight: 700; color: ${headingColor}; margin-bottom: 20px; }
    .highlight-box { background-color: #f3f4f6; border-left: 4px solid #000000; padding: 15px; margin: 25px 0; border-radius: 4px; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .button { display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SURGE INNOVATIONS</div>
    </div>
    
    <div class="content">
      <div class="h1">${heading}</div>
      ${mainBody}
    </div>

    <div class="footer">
      &copy; ${new Date().getFullYear()} Surge Innovations Ltd. Nairobi, Kenya.<br/>
      This is an automated message. Please do not reply directly.
    </div>
  </div>
</body>
</html>
  `};
}