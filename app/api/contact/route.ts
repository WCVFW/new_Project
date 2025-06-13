export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Save contact data
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: "new",
    }

    console.log("New contact form submission:", contactData)

    // Send email to company owner
    await sendContactEmailToOwner(contactData)

    // Send WhatsApp notification to admin
    await sendContactWhatsAppNotification(contactData)

    // Send auto-reply to user
    await sendAutoReplyEmail(contactData)

    return Response.json({ success: true, message: "Contact form submitted successfully" })
  } catch (error) {
    console.error("Contact API error:", error)
    return Response.json({ success: false, message: "Failed to submit contact form" }, { status: 500 })
  }
}

async function sendContactEmailToOwner(contactData: any) {
  const emailData = {
    to: process.env.COMPANY_OWNER_EMAIL || "owner@voiceforwomen.org",
    subject: `New Contact Form Submission: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ec4899;">New Contact Form Submission</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Submitted:</strong> ${new Date(contactData.timestamp).toLocaleString()}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #ec4899; margin: 20px 0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <p><strong>Reply to:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
      </div>
    `,
  }

  console.log("Sending contact email to owner:", emailData)
  // Implement actual email sending here
}

async function sendContactWhatsAppNotification(contactData: any) {
  const whatsappData = {
    to: process.env.ADMIN_WHATSAPP_NUMBER,
    message: `📧 New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message: ${contactData.message}

Time: ${new Date(contactData.timestamp).toLocaleString()}

Please respond promptly! 📱`,
  }

  console.log("Sending contact WhatsApp notification:", whatsappData)
  // Implement actual WhatsApp sending here
}

async function sendAutoReplyEmail(contactData: any) {
  const emailData = {
    to: contactData.email,
    subject: "Thank you for contacting Voice for Women Foundation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ec4899;">Thank You for Reaching Out!</h2>
        <p>Dear ${contactData.name},</p>
        <p>Thank you for contacting Voice for Women Foundation. We have received your message and will respond within 24-48 hours.</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Message:</h3>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <p>In the meantime, feel free to explore our website to learn more about our programs and impact.</p>
        
        <p>Best regards,<br>Voice for Women Foundation Team</p>
      </div>
    `,
  }

  console.log("Sending auto-reply email:", emailData)
  // Implement actual email sending here
}
