"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ReadMoreTextProps {
  text: string
  maxLength: number
  className?: string
}

export default function ReadMoreText({ text, maxLength, className = "" }: ReadMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldTruncate = text.length > maxLength
  const displayText = isExpanded ? text : text.slice(0, maxLength)

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>
  }

  return (
    <div className={className}>
      <p>
        {displayText}
        {!isExpanded && "..."}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 p-0 h-auto font-medium"
      >
        {isExpanded ? (
          <>
            Read Less <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            Read More <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
