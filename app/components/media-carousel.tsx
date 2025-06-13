"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Volume2, ImageIcon } from "lucide-react"

const mediaItems = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=400&width=600",
    title: "Education Program Launch",
    description: "Celebrating the launch of our new scholarship program in rural communities.",
  },
  {
    id: 2,
    type: "video",
    src: "/placeholder.svg?height=400&width=600",
    title: "Healthcare Initiative",
    description: "Mobile healthcare units bringing essential services to remote areas.",
  },
  {
    id: 3,
    type: "audio",
    src: "/placeholder.svg?height=400&width=600",
    title: "Success Stories",
    description: "Listen to inspiring stories from women who transformed their lives.",
  },
  {
    id: 4,
    type: "image",
    src: "/placeholder.svg?height=400&width=600",
    title: "Economic Empowerment",
    description: "Women entrepreneurs showcasing their successful businesses.",
  },
  {
    id: 5,
    type: "video",
    src: "/placeholder.svg?height=400&width=600",
    title: "Leadership Training",
    description: "Developing the next generation of women leaders.",
  },
]

export default function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }

  const playMedia = (id: number) => {
    setIsPlaying(id)
    setTimeout(() => setIsPlaying(null), 3000)
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-8 w-8" />
      case "audio":
        return <Volume2 className="h-8 w-8" />
      default:
        return <ImageIcon className="h-8 w-8" />
    }
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 min-h-[500px]"
          >
            <div className="relative group">
              <img
                src={mediaItems[currentIndex].src || "/placeholder.svg"}
                alt={mediaItems[currentIndex].title}
                className="w-full h-80 object-cover rounded-xl shadow-2xl"
              />

              {/* Media Type Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => playMedia(mediaItems[currentIndex].id)}
                  className="bg-pink-600 hover:bg-pink-700 text-white rounded-full p-4"
                  disabled={isPlaying === mediaItems[currentIndex].id}
                >
                  {isPlaying === mediaItems[currentIndex].id ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {getMediaIcon(mediaItems[currentIndex].type)}
                    </motion.div>
                  ) : (
                    getMediaIcon(mediaItems[currentIndex].type)
                  )}
                </Button>
              </div>

              {/* Media Type Badge */}
              <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                {mediaItems[currentIndex].type}
              </div>
            </div>

            <div className="space-y-6">
              <motion.h3
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {mediaItems[currentIndex].title}
              </motion.h3>

              <motion.p
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {mediaItems[currentIndex].description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-pink-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
