"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Volume2, ImageIcon, Calendar, Eye } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Women's Leadership Summit 2024",
    description: "Highlights from our annual leadership summit featuring inspiring speakers and success stories.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "March 15, 2024",
    views: "12,450",
    duration: "15:30",
  },
  {
    id: 2,
    type: "image",
    title: "Healthcare Mobile Clinic Launch",
    description: "Launch of our new mobile healthcare units serving rural communities.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "March 10, 2024",
    views: "8,230",
  },
  {
    id: 3,
    type: "audio",
    title: "Success Stories Podcast - Episode 12",
    description: "Inspiring stories from women entrepreneurs who transformed their communities.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "March 8, 2024",
    views: "5,670",
    duration: "28:45",
  },
  {
    id: 4,
    type: "video",
    title: "Education Program Impact",
    description: "Documentary showcasing the impact of our scholarship programs across 25 countries.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "March 5, 2024",
    views: "18,920",
    duration: "22:15",
  },
  {
    id: 5,
    type: "image",
    title: "International Women's Day Celebration",
    description: "Global celebrations and events organized by our foundation worldwide.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "March 8, 2024",
    views: "15,340",
  },
  {
    id: 6,
    type: "audio",
    title: "CEO Interview - Future Vision",
    description: "Exclusive interview with our CEO discussing the future of women's empowerment.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "February 28, 2024",
    views: "9,180",
    duration: "35:20",
  },
]

export default function MediaPage() {
  const [filter, setFilter] = useState("all")
  const [playingId, setPlayingId] = useState<number | null>(null)

  const filteredItems = filter === "all" ? mediaItems : mediaItems.filter((item) => item.type === filter)

  const playMedia = (id: number) => {
    setPlayingId(id)
    setTimeout(() => setPlayingId(null), 3000)
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-6 w-6" />
      case "audio":
        return <Volume2 className="h-6 w-6" />
      default:
        return <ImageIcon className="h-6 w-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-purple-100 text-purple-700"
      case "audio":
        return "bg-rose-100 text-rose-700"
      default:
        return "bg-pink-100 text-pink-700"
    }
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
          <h1 className="text-6xl font-bold text-gray-800 mb-6">Media Center</h1>
          <p className="text-xl text-gray-600">
            Explore our collection of inspiring stories, educational content, and impact documentation
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {["all", "video", "image", "audio"].map((type) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? "default" : "outline"}
                className={filter === type ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                {type === "all" ? "All Media" : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Media Type Badge */}
                      <Badge className={`absolute top-3 left-3 ${getTypeColor(item.type)}`}>{item.type}</Badge>

                      {/* Duration Badge */}
                      {item.duration && (
                        <Badge className="absolute top-3 right-3 bg-black/70 text-white">{item.duration}</Badge>
                      )}

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => playMedia(item.id)}
                          className="bg-white/90 hover:bg-white text-pink-600 rounded-full p-4"
                          disabled={playingId === item.id}
                        >
                          {playingId === item.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              {getMediaIcon(item.type)}
                            </motion.div>
                          ) : (
                            getMediaIcon(item.type)
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views} views
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Content</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Featured Documentary"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <Badge className="bg-purple-100 text-purple-700 mb-4">Featured Documentary</Badge>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Voices of Change: A Global Journey</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Follow the inspiring journeys of women from different continents as they overcome challenges, break
                barriers, and create lasting change in their communities. This feature-length documentary showcases the
                real impact of our programs and the incredible strength of the human spirit.
              </p>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                Watch Now <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
