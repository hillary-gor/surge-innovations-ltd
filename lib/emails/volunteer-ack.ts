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