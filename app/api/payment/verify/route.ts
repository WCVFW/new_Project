import type { NextRequest } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorData, amount, donationType } =
      await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      // Save donation to database (simulate with console.log)
      const donationRecord = {
        id: Date.now().toString(),
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: Number.parseFloat(amount),
        donationType,
        donorData,
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      console.log("Donation completed:", donationRecord)

      // Send confirmation email
      await sendConfirmationEmail(donorData, amount, razorpay_payment_id)

      // Send WhatsApp notification to admin
      await sendWhatsAppNotification(donorData, amount)

      // Add to newsletter if not already subscribed
      await addToNewsletter(donorData.email, donorData.name)

      return Response.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      })
    } else {
      return Response.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return Response.json(
      {
        success: false,
        message: "Payment verification failed",
      },
      { status: 500 },
    )
  }
}

async function sendConfirmationEmail(donorData: any, amount: string, paymentId: string) {
  // Simulate sending email using your preferred email service (SendGrid, AWS SES, etc.)
  const emailData = {
    to: donorData.email,
    subject: "Thank you for your donation - Voice for Women Foundation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ec4899;">Thank You for Your Generous Donation!</h2>
        <p>Dear ${donorData.name},</p>
        <p>We are deeply grateful for your donation of ₹${amount} to Voice for Women Foundation.</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Donation Details:</h3>
          <p><strong>Amount:</strong> ₹${amount}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Your contribution will help us empower women through education, healthcare, and economic opportunities worldwide.</p>
        <p>A tax receipt will be sent to you separately within 3-5 business days.</p>
        
        <p>With gratitude,<br>Voice for Women Foundation Team</p>
      </div>
    `,
  }

  console.log("Sending confirmation email:", emailData)
  // Implement actual email sending here
}

async function sendWhatsAppNotification(donorData: any, amount: string) {
  // Simulate WhatsApp notification using Twilio WhatsApp API or similar
  const whatsappData = {
    to: process.env.ADMIN_WHATSAPP_NUMBER, // Admin's WhatsApp number
    message: `🎉 New Donation Received!
    
Donor: ${donorData.name}
Amount: ₹${amount}
Email: ${donorData.email}
Phone: ${donorData.phone}
Time: ${new Date().toLocaleString()}

Thank you for supporting Voice for Women Foundation! 💖`,
  }

  console.log("Sending WhatsApp notification:", whatsappData)
  // Implement actual WhatsApp sending here using Twilio or similar service
}

async function addToNewsletter(email: string, name: string) {
  // Add donor to newsletter subscription
  const subscriptionData = {
    email,
    name,
    source: "donation",
    timestamp: new Date().toISOString(),
    status: "active",
  }

  console.log("Adding to newsletter:", subscriptionData)
  // Implement newsletter subscription logic
}
