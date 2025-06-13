"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Menu, X, Heart, Settings, ChevronDown, Users, GraduationCap, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const programsDropdown = [
  {
    href: "/programs/education",
    label: "Education Empowerment",
    icon: GraduationCap,
    description: "Scholarships and educational support",
  },
  {
    href: "/programs/healthcare",
    label: "Healthcare Access",
    icon: Heart,
    description: "Medical services and wellness programs",
  },
  {
    href: "/programs/economic",
    label: "Economic Empowerment",
    icon: Briefcase,
    description: "Business training and microfinance",
  },
  {
    href: "/programs/leadership",
    label: "Leadership Development",
    icon: Users,
    description: "Training future women leaders",
  },
]

const aboutDropdown = [
  { href: "/about", label: "Our Story", description: "Learn about our mission and vision" },
  { href: "/leadership", label: "Leadership Team", description: "Meet our founders and executives" },
  { href: "/impact", label: "Our Impact", description: "See the difference we're making" },
  { href: "/partners", label: "Partners", description: "Organizations working with us" },
]

export default function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const menuItems = [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "About",
      hasDropdown: true,
      dropdown: aboutDropdown,
    },
    {
      href: "/programs",
      label: "Programs",
      hasDropdown: true,
      dropdown: programsDropdown,
    },
    { href: "/media", label: "Media" },
    { href: "/events", label: "Events" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/contact", label: "Contact" },
  ]

  // Check if user is the specific admin user
  const isAdmin = status === "authenticated" && session?.user?.email === "wcvfw2019@gmail.com"

  return (
    <motion.header
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pink-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Heart className="h-10 w-10 text-pink-600" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-pink-400/30 rounded-full blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
            <div>
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Voice for Women
              </motion.span>
              <motion.p
                className="text-xs text-pink-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Empowering Every Dream
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium relative group py-2"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <motion.div
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </motion.div>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-all group-hover:w-full"></span>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.dropdown?.map((dropdownItem, index) => (
                          <motion.div
                            key={dropdownItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className="flex items-start p-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.icon && (
                                <dropdownItem.icon className="h-6 w-6 text-pink-600 mr-3 mt-0.5 group-hover:scale-110 transition-transform" />
                              )}
                              <div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                                  {dropdownItem.label}
                                </h3>
                                {dropdownItem.description && (
                                  <p className="text-sm text-gray-600 mt-1">{dropdownItem.description}</p>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Donate Button - Always visible */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/donate">
                <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-2 rounded-full shadow-lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>
              </Link>
            </motion.div>

            {/* Admin Button - Only show for authenticated admin user */}
            {isAdmin && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 rounded-full px-4 py-2 font-medium shadow-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link> */}
              </motion.div>
            )}

            {/* Login Button - Show only when not authenticated */}
            {status === "unauthenticated" && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full px-4 py-2"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl hover:bg-pink-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-pink-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-pink-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-pink-100 pt-4 overflow-hidden"
            >
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && item.dropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="pt-4 space-y-2">
                  {/* Donate Button - Always visible in mobile */}
                  <Link href="/donate" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                  </Link>

                  {/* Admin Button - Only show for authenticated admin user in mobile */}
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}

                  {/* Login Button - Show only when not authenticated in mobile */}
                  {status === "unauthenticated" && (
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl border border-gray-200"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
