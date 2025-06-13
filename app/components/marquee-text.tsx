"use client"

import { motion } from "framer-motion"

interface MarqueeTextProps {
  text: string
  speed?: number
}

export default function MarqueeText({ text, speed = 50 }: MarqueeTextProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="text-lg font-medium">{text}</span>
      </motion.div>
    </div>
  )
}
