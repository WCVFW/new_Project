"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, ArrowLeft, Home, AlertTriangle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "Configuration":
        return {
          title: "Configuration Error",
          message: "There is a problem with the server configuration. Please contact support.",
          icon: AlertTriangle,
          color: "orange",
        }
      case "AccessDenied":
        return {
          title: "Access Denied",
          message:
            "You don't have permission to access this resource. Only authorized administrators can access the admin area.",
          icon: XCircle,
          color: "red",
        }
      case "Verification":
        return {
          title: "Verification Error",
          message: "The verification token has expired or is invalid. Please try signing in again.",
          icon: RefreshCw,
          color: "yellow",
        }
      case "CredentialsSignin":
        return {
          title: "Invalid Credentials",
          message: "The email or password you entered is incorrect. Please check your credentials and try again.",
          icon: XCircle,
          color: "red",
        }
      case "SessionRequired":
        return {
          title: "Session Required",
          message: "You need to be signed in to access this page.",
          icon: AlertTriangle,
          color: "orange",
        }
      default:
        return {
          title: "Authentication Error",
          message:
            "An unexpected error occurred during authentication. Please try again or contact support if the problem persists.",
          icon: XCircle,
          color: "red",
        }
    }
  }

  const errorInfo = getErrorMessage(error)
  const IconComponent = errorInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <IconComponent
                className={`h-16 w-16 mx-auto mb-4 ${
                  errorInfo.color === "red"
                    ? "text-red-500"
                    : errorInfo.color === "orange"
                      ? "text-orange-500"
                      : errorInfo.color === "yellow"
                        ? "text-yellow-500"
                        : "text-gray-500"
                }`}
              />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">{errorInfo.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{errorInfo.message}</p>

            {error && (
              <div className="bg-gray-50 p-3 rounded-lg mb-6">
                <p className="text-xs text-gray-500 mb-1">Error Code:</p>
                <p className="text-sm font-mono text-gray-700">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Try Signing In Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full border-pink-300 text-pink-700 hover:bg-pink-50">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Need Help?</span>
              </div>
              <p className="text-xs mt-1 text-blue-700">
                If you continue to experience issues, please contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-pink-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  )
}
