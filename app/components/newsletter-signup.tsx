"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubscribed(true)
        setEmail("")
        setName("")
        setTimeout(() => setIsSubscribed(false), 5000)
      }
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 bg-green-50 rounded-lg border border-green-200"
      >
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome to Our Community!</h3>
        <p className="text-green-600">
          Thank you for subscribing! Check your email for a welcome message with exciting updates about our upcoming
          events and programs.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
      <div className="text-center mb-4">
        <Mail className="h-8 w-8 text-pink-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm">
          Get the latest updates on events, programs, and inspiring stories delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border-pink-200 focus:border-pink-400"
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white border-pink-200 focus:border-pink-400"
        />
        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
        >
          {isLoading ? "Subscribing..." : "Subscribe for Updates"}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-3 text-center">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}
