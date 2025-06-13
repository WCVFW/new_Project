"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Slide {
  image: string
  title: string
  description: string
}

interface MediaCarouselProps {
  slides: Slide[]
}

const MediaCarousel = ({ slides }: MediaCarouselProps) => {
  const [position, setPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      const intervalId = setInterval(() => {
        setPosition((prevPosition) => {
          const newPosition = prevPosition + 1
          return newPosition >= slides.length ? 0 : newPosition
        })
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [slides.length])

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-6 py-4"
        animate={{ x: `-${position * (100 / slides.length)}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        ref={carouselRef}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-1">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{slide.title}</h3>
                <p className="text-sm text-white/90 line-clamp-2">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default MediaCarousel
