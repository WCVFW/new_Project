"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Calendar, MapPin, Users } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

const galleryItems = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    title: "Education Program Launch in Kenya",
    category: "Education",
    date: "March 2024",
    location: "Nairobi, Kenya",
    description:
      "Celebrating the launch of our new scholarship program with 100 young women receiving educational support.",
    participants: "100+ students",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    title: "Healthcare Mobile Clinic",
    category: "Healthcare",
    date: "February 2024",
    location: "Rural Bangladesh",
    description: "Our mobile healthcare unit providing essential medical services to women in remote communities.",
    participants: "500+ women served",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    title: "Women's Leadership Summit",
    category: "Leadership",
    date: "January 2024",
    location: "New York, USA",
    description:
      "Annual summit bringing together women leaders from around the world to share experiences and strategies.",
    participants: "300+ leaders",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    title: "Entrepreneurship Workshop",
    category: "Economic",
    date: "December 2023",
    location: "Mumbai, India",
    description: "Training women entrepreneurs in business development and financial literacy.",
    participants: "150+ entrepreneurs",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    title: "International Women's Day",
    category: "Events",
    date: "March 2024",
    location: "Global",
    description: "Worldwide celebrations honoring women's achievements and advocating for gender equality.",
    participants: "10,000+ participants",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    title: "Digital Literacy Training",
    category: "Education",
    date: "November 2023",
    location: "Lagos, Nigeria",
    description: "Teaching digital skills to help women access online opportunities and resources.",
    participants: "200+ women trained",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    title: "Maternal Health Initiative",
    category: "Healthcare",
    date: "October 2023",
    location: "Guatemala",
    description: "Providing prenatal care and health education to expectant mothers in rural areas.",
    participants: "300+ mothers",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    title: "Microfinance Program",
    category: "Economic",
    date: "September 2023",
    location: "Philippines",
    description: "Launching microfinance initiatives to support women-owned small businesses.",
    participants: "250+ businesses",
  },
]

const categories = ["All", "Education", "Healthcare", "Leadership", "Economic", "Events"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      Education: "bg-blue-100 text-blue-700",
      Healthcare: "bg-green-100 text-green-700",
      Leadership: "bg-purple-100 text-purple-700",
      Economic: "bg-orange-100 text-orange-700",
      Events: "bg-pink-100 text-pink-700",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Photo <span className="text-pink-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600">
            Witness the incredible moments and transformative impact of our programs around the world
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                      : "border-pink-300 text-pink-700 hover:bg-pink-50"
                  } rounded-full px-6 py-2`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Category Badge */}
                        <Badge className={`absolute top-3 left-3 ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </Badge>

                        {/* Zoom Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 p-3 rounded-full">
                            <ZoomIn className="h-6 w-6 text-pink-600" />
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <h3 className="font-bold text-lg mb-1 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.date}
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <X className="h-6 w-6" />
              </Button>

              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getCategoryColor(selectedImage.category)}>{selectedImage.category}</Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedImage.participants}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedImage.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{selectedImage.description}</p>

                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-pink-600" />
                    {selectedImage.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-pink-600" />
                    {selectedImage.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Be Part of Our Story</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in creating more moments of transformation and empowerment for women worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full">
              Get Involved
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 rounded-full"
            >
              Share Your Story
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
