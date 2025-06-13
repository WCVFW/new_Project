import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Check if credentials match the admin account
          if (credentials?.email === "wcvfw2019@gmail.com" && credentials?.password === "12345678@#$") {
            return {
              id: "1",
              email: "wcvfw2019@gmail.com",
              name: "Admin User",
              role: "admin",
            }
          }
          return null
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        if (session.user?.email === "wcvfw2019@gmail.com") {
          ;(session.user as any).role = "admin"
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return session
      }
    },
    async jwt({ token, user }) {
      try {
        if (user?.email === "wcvfw2019@gmail.com") {
          token.role = "admin"
        }
        return token
      } catch (error) {
        console.error("JWT callback error:", error)
        return token
      }
    },
    async redirect({ url, baseUrl }) {
      // Handles redirect on signin
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development",
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }
