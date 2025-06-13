import type { NextRequest } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  // key_id: process.env.RAZORPAY_KEY_ID!,
  // key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, donationType, donorData } = await request.json()

    const options = {
      amount: amount, // amount in paise
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
      { status: 500 },
    )
  }
}
