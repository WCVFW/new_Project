import type { NextRequest } from "next/server"
import Razorpay from "razorpay"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, donationType, donorData } = await request.json()

    // ✅ Initialize Razorpay here to avoid build-time crash
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "test_key",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
    })

    const options = {
      amount: amount,
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        donation_type: donationType,
        donor_name: donorData.name,
        donor_email: donorData.email,
        donor_phone: donorData.phone,
      },
    }

    const order = await razorpay.orders.create(options)

    return Response.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to create payment order",
      },
      { status: 500 }
    )
  }
}
