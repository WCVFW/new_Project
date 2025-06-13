"use client"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import NewsletterSignup from "./newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="h-10 w-10 text-pink-400" />
              <div>
                <span className="text-3xl font-bold">Voice for Women</span>
                <p className="text-pink-300 text-sm">Empowering Every Dream</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming lives through education, healthcare, and economic empowerment. Join our global movement to
              create lasting change for women worldwide.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 mb-8">
              <motion.a
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-pink-300">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Programs" },
                { href: "/leadership", label: "Leadership" },
                { href: "/media", label: "Media Center" },
                { href: "/contact", label: "Contact" },
                { href: "/donate", label: "Donate" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-300 hover:text-pink-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-pink-300">Stay Connected</h3>
            <NewsletterSignup />
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-pink-400" />
              <span className="text-gray-300">info@voiceforwomen.org</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-pink-400" />
              <span className="text-gray-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-pink-400" />
              <span className="text-gray-300">Mumbai, India</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Voice for Women Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-pink-400 transition-colors">
                Terms of Service
              </a>
              <a href="/transparency" className="text-gray-400 hover:text-pink-400 transition-colors">
                Transparency
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
