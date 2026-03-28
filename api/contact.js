import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      fullName,
      email,
      phone,
      projectType,
      preferredTimeline,
      projectDetails,
    } = req.body || {};

    if (!fullName || !email || !phone || !projectDetails) {
      return res.status(400).json({
        error: "Please complete all required fields.",
      });
    }

    const safeFullName = escapeHtml(fullName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeProjectType = escapeHtml((projectType || "").trim());
    const safePreferredTimeline = escapeHtml((preferredTimeline || "").trim());
    const safeProjectDetails = escapeHtml(projectDetails.trim()).replace(/\n/g, "<br />");

    const subject = "New Customer Inquiry for Royalty Resin";

    const html = `
      <div style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;color:#111827;">
        <div style="max-width:700px;margin:0 auto;padding:32px 16px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <div style="background:#111827;padding:28px 32px;">
              <p style="margin:0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#f87171;">
                Royalty Resin Website
              </p>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#ffffff;">
                New Customer Inquiry
              </h1>
            </div>

            <div style="padding:32px;">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#374151;">
                A potential customer has submitted a new inquiry through the <strong>Royalty Resin</strong> website.
              </p>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;width:220px;font-weight:700;">Full Name</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#374151;">${safeFullName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;">Email</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#374151;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;">Phone</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#374151;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;">Project Type</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#374151;">${safeProjectType || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;">Preferred Timeline</td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#374151;">${safePreferredTimeline || "Not provided"}</td>
                </tr>
              </table>

              <div style="margin-top:24px;">
                <p style="margin:0 0 10px;font-size:15px;font-weight:700;color:#111827;">Project Details</p>
                <div style="padding:18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;color:#374151;line-height:1.7;">
                  ${safeProjectDetails}
                </div>
              </div>

              <div style="margin-top:24px;padding:16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#9a3412;">
                  You can reply directly to this email to contact the customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Royalty Resin Website <website@royaltyresin270.com>",
      to: ["leonardoserrate9@gmail.com"],
      replyTo: email.trim(),
      subject,
      html,
    });

    return res.status(200).json({
      success: true,
      id: data.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Failed to send email.",
    });
  }
}