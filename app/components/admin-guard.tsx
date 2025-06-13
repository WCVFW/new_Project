"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, XCircle } from "lucide-react"
import Head from "next/head"

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (status === "loading") {
        return // Still loading
      }

      // Only allow access if the user is authenticated and has the specific admin email
      const isAdmin = status === "authenticated" && session?.user?.email === "wcvfw2019@gmail.com"

      setIsChecking(false)
      setIsAuthorized(isAdmin)

      if (status === "unauthenticated") {
        router.push("/auth/signin?error=SessionRequired")
        return
      }

      if (status === "authenticated" && !isAdmin) {
        router.push("/auth/error?error=AccessDenied")
        return
      }
    }

    checkAccess()
  }, [session, status, router])

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin access...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Access denied. Redirecting...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </>
  )
}
