"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Clock, MapPin, Star, ArrowRight } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import { useState } from "react"

const volunteerOpportunities = [
  {
    id: 1,
    title: "Education Program Coordinator",
    location: "Remote / Global",
    time: "10-15 hours/week",
    image: "/placeholder.svg?height=300&width=400",
    description: "Help coordinate our global education programs and support scholarship recipients worldwide.",
    skills: ["Project Management", "Communication", "Education Background"],
    impact: "Directly support 100+ students",
    urgent: true,
  },
  {
    id: 2,
    title: "Healthcare Outreach Volunteer",
    location: "Local Communities",
    time: "5-10 hours/week",
    image: "/placeholder.svg?height=300&width=400",
    description: "Assist with mobile healthcare clinics and community health education programs.",
    skills: ["Healthcare Background", "Community Outreach", "Multilingual"],
    impact: "Serve 500+ women monthly",
    urgent: false,
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    location: "Remote",
    time: "8-12 hours/week",
    image: "/placeholder.svg?height=300&width=400",
    description: "Help amplify our message through social media, content creation, and digital campaigns.",
    skills: ["Social Media", "Content Creation", "Digital Marketing"],
    impact: "Reach 10K+ people monthly",
    urgent: true,
  },
  {
    id: 4,
    title: "Fundraising Event Assistant",
    location: "Major Cities",
    time: "Flexible",
    image: "/placeholder.svg?height=300&width=400",
    description: "Support fundraising events, galas, and community outreach activities.",
    skills: ["Event Planning", "Customer Service", "Networking"],
    impact: "Raise funds for programs",
    urgent: false,
  },
]

const volunteerStories = [
  {
    name: "Emily Rodriguez",
    role: "Education Coordinator",
    image: "/placeholder.svg?height=150&width=150",
    story:
      "Volunteering with Voice for Women has been the most rewarding experience of my life. Seeing young girls receive scholarships and pursue their dreams makes every hour worth it.",
    duration: "2 years",
  },
  {
    name: "Dr. Michael Chen",
    role: "Healthcare Volunteer",
    image: "/placeholder.svg?height=150&width=150",
    story:
      "As a healthcare professional, I'm amazed by the impact our mobile clinics have on rural communities. We're literally saving lives and empowering women to take control of their health.",
    duration: "1.5 years",
  },
  {
    name: "Sarah Thompson",
    role: "Digital Marketing",
    image: "/placeholder.svg?height=150&width=150",
    story:
      "Using my marketing skills to amplify women's voices has been incredibly fulfilling. Our campaigns have helped raise awareness and funds for critical programs worldwide.",
    duration: "3 years",
  },
]

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    motivation: "",
    experience: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Volunteer application:", formData)
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
          className="absolute top-10 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div className="max-w-6xl mx-auto" initial="initial" animate="animate" variants={fadeInUp}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold text-gray-800 mb-6">
                Join Our <span className="text-pink-600">Mission</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Make a meaningful impact in women's lives worldwide. Your skills, passion, and time can help us create
                lasting change in communities across the globe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Start Volunteering
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-4 rounded-full text-lg"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="relative">
              <motion.img
                src="/placeholder.svg?height=500&width=600"
                alt="Volunteers making a difference"
                className="rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-pink-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-pink-600" />
                  <div>
                    <p className="font-bold text-2xl text-gray-800">2,500+</p>
                    <p className="text-sm text-gray-600">Active Volunteers</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect way to contribute your skills and make a difference in women's lives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={opportunity.image || "/placeholder.svg"}
                        alt={opportunity.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {opportunity.urgent && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Urgent Need
                        </Badge>
                      )}
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{opportunity.impact}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-pink-600" />
                          {opportunity.time}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-pink-100 text-pink-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Stories */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Volunteer Stories</h2>
            <p className="text-xl text-gray-600">
              Hear from our amazing volunteers about their transformative experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {volunteerStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="text-center">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-pink-200"
                    />
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{story.name}</h3>
                    <p className="text-pink-600 font-medium mb-2">{story.role}</p>
                    <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                      {story.duration} volunteer
                    </Badge>
                    <p className="text-gray-600 italic leading-relaxed">"{story.story}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600">
              Fill out our volunteer application form and join our global community of changemakers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-2xl">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability (hours/week)</Label>
                      <Input
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        placeholder="e.g., 5-10 hours"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills & Expertise</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Tell us about your skills, experience, and areas of expertise..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      placeholder="Share your motivation and what you hope to achieve..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Previous Volunteer Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Tell us about any previous volunteer work or relevant experience..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 text-lg"
                    >
                      Submit Application <Heart className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Volunteer Impact</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "2,500+", label: "Active Volunteers", icon: Users },
              { number: "50,000+", label: "Hours Contributed", icon: Clock },
              { number: "35", label: "Countries", icon: Globe },
              { number: "15,000+", label: "Lives Impacted", icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
