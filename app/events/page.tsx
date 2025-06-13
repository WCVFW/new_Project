"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ArrowRight, Star } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

const upcomingEvents = [
  {
    id: 1,
    title: "Global Women's Leadership Summit 2024",
    date: "June 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "New York Convention Center",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Join 500+ women leaders from around the world for three days of inspiring talks, networking, and skill-building workshops.",
    speakers: ["Dr. Sarah Johnson", "Maria Rodriguez", "Dr. Amara Okafor"],
    price: "Free",
    category: "Conference",
    featured: true,
  },
  {
    id: 2,
    title: "Healthcare Access Workshop",
    date: "May 20, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Community Health Center, Chicago",
    image: "/placeholder.svg?height=300&width=400",
    description: "Learn about our mobile healthcare initiatives and how communities can implement similar programs.",
    speakers: ["Dr. Amara Okafor", "Local Health Experts"],
    price: "Free",
    category: "Workshop",
    featured: false,
  },
  {
    id: 3,
    title: "Entrepreneurship Bootcamp",
    date: "July 8-10, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Hub, San Francisco",
    image: "/placeholder.svg?height=300&width=400",
    description: "Three-day intensive program for women entrepreneurs looking to scale their businesses.",
    speakers: ["Jennifer Chen", "Successful Entrepreneurs"],
    price: "$299",
    category: "Bootcamp",
    featured: true,
  },
  {
    id: 4,
    title: "Education Scholarship Gala",
    date: "August 12, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Ballroom, Los Angeles",
    image: "/placeholder.svg?height=300&width=400",
    description: "Annual fundraising gala to support our education scholarship programs worldwide.",
    speakers: ["Celebrity Guests", "Scholarship Recipients"],
    price: "$150",
    category: "Gala",
    featured: false,
  },
]

const pastEvents = [
  {
    id: 5,
    title: "International Women's Day Celebration",
    date: "March 8, 2024",
    location: "Multiple Cities Worldwide",
    image: "/placeholder.svg?height=300&width=400",
    attendees: "10,000+",
    highlights: ["Global Solidarity", "Success Stories", "Cultural Performances"],
  },
  {
    id: 6,
    title: "Digital Literacy Training",
    date: "February 15, 2024",
    location: "Rural Communities, Kenya",
    image: "/placeholder.svg?height=300&width=400",
    attendees: "500+",
    highlights: ["Technology Skills", "Online Safety", "Digital Entrepreneurship"],
  },
]

export default function EventsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-purple-200/30 rounded-full blur-xl"
          animate={{ scale: [1, 0.8, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div className="max-w-4xl mx-auto text-center" initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Upcoming <span className="text-pink-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join us for inspiring events, workshops, and conferences that bring women together to learn, network, and
            create change
          </p>
        </motion.div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Events
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {upcomingEvents
              .filter((event) => event.featured)
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-pink-600 text-white">{event.category}</Badge>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-pink-600" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-pink-600" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-pink-600">{event.price}</div>
                          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                            Register Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* All Upcoming Events */}
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            All Upcoming Events
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 left-3 bg-pink-600 text-white">{event.category}</Badge>
                      </div>

                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                        <div className="space-y-1 mb-4 text-xs">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-3 w-3 mr-2 text-pink-600" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-3 w-3 mr-2 text-pink-600" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">{event.price}</span>
                          <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
                            Register
                          </Button>
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

      {/* Past Events */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Past Events Highlights
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center mb-2">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{event.attendees} Attendees</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2 text-pink-600" />
                        {event.date} • {event.location}
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Event Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-pink-100 text-pink-700">
                              {highlight}
                            </Badge>
                          ))}
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

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=400')",
            backgroundSize: "400px 400px",
          }}
        />

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't Miss Our Next Event</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter to get notified about upcoming events and exclusive opportunities
          </p>
          <Button
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg shadow-xl"
          >
            Subscribe for Updates
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
