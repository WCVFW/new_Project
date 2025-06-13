"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, CreditCard, Shield, CheckCircle } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("50")
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDonated, setIsDonated] = useState(false)
  const [paymentId, setPaymentId] = useState("")

  const predefinedAmounts = ["25", "50", "100", "250", "500"]

  const handleDonorChange = (field: string, value: string) => {
    setDonorData((prev) => ({ ...prev, [field]: value }))
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const finalAmount = donationAmount === "custom" ? customAmount : donationAmount
    const amountInPaise = Number.parseInt(finalAmount) * 100 // Convert to paise

    try {
      // Initialize Razorpay
      const res = await initializeRazorpay()
      if (!res) {
        alert("Razorpay SDK failed to load. Please check your internet connection.")
        setIsProcessing(false)
        return
      }

      // Create order on backend
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          donationType,
          donorData,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.message)
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890", // Replace with your key
        amount: amountInPaise,
        currency: "INR",
        name: "Voice for Women Foundation",
        description: `${donationType === "monthly" ? "Monthly" : "One-time"} Donation`,
        image: "/placeholder.svg?height=100&width=100",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData,
              amount: finalAmount,
              donationType,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            setPaymentId(response.razorpay_payment_id)
            setIsDonated(true)
            // Reset form
            setDonorData({
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              zipCode: "",
            })
          } else {
            alert("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: donorData.name,
          email: donorData.email,
          contact: donorData.phone,
        },
        notes: {
          donation_type: donationType,
          address: donorData.address,
        },
        theme: {
          color: "#ec4899",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Donation error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  if (isDonated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-4">
              Your generous donation will help us empower more women worldwide.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Payment ID:</p>
              <p className="font-mono text-sm text-gray-800">{paymentId}</p>
            </div>
            <p className="text-gray-500 mb-6">You'll receive a confirmation email and tax receipt shortly.</p>
            <Button
              onClick={() => {
                setIsDonated(false)
                setPaymentId("")
              }}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              Make Another Donation
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div className="max-w-4xl mx-auto text-center" initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Make a Difference</h1>
          <p className="text-xl text-gray-600">
            Your donation helps us empower women through education, healthcare, and economic opportunities.
          </p>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl font-bold text-pink-600 mb-2">₹2,000</div>
                <p className="text-gray-600">Provides school supplies for one girl</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl font-bold text-pink-600 mb-2">₹8,000</div>
                <p className="text-gray-600">Funds healthcare for one woman for a month</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl font-bold text-pink-600 mb-2">₹40,000</div>
                <p className="text-gray-600">Sponsors business training for 10 women</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <CardContent>
                <form onSubmit={handleDonate} className="space-y-8">
                  {/* Donation Type */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Donation Type</Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Donation Amount (₹)</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount)}
                          className={donationAmount === amount ? "bg-pink-600 hover:bg-pink-700" : ""}
                        >
                          ₹{amount}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant={donationAmount === "custom" ? "default" : "outline"}
                        onClick={() => setDonationAmount("custom")}
                        className={donationAmount === "custom" ? "bg-pink-600 hover:bg-pink-700" : ""}
                      >
                        Custom
                      </Button>
                    </div>

                    {donationAmount === "custom" && (
                      <div className="max-w-xs">
                        <Label htmlFor="custom-amount">Custom Amount (₹)</Label>
                        <Input
                          id="custom-amount"
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Donor Information */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Donor Information</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={donorData.name}
                          onChange={(e) => handleDonorChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorData.email}
                          onChange={(e) => handleDonorChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={donorData.phone}
                          onChange={(e) => handleDonorChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={donorData.city}
                          onChange={(e) => handleDonorChange("city", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Address (For Tax Receipt)</Label>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={donorData.address}
                          onChange={(e) => handleDonorChange("address", e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={donorData.zipCode}
                            onChange={(e) => handleDonorChange("zipCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Secure Payment:</strong> Your payment is processed securely through Razorpay with
                        256-bit SSL encryption.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        We accept UPI, Credit/Debit Cards, Net Banking, and Wallets.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing || !donorData.name || !donorData.email || !donorData.phone}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-4"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Donate ₹{donationAmount === "custom" ? customAmount : donationAmount} via Razorpay
                      </>
                    )}
                    <Heart className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
