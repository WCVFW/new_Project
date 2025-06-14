"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import ReadMoreText from "../components/read-more-text"

const leaders = [
  {
    id: 1,
    name: "Mr. Gunalan Lavanyan",
    title: "Founder & Chairman",
    image: "/gunalan.JPG?height=300&width=300",
    bio: "A seasoned media professional with over 2 decades of experience, Mr. Gunalan Lavanyan is a passionate advocate for social justice. Since initiating the We Can Voice for Women movement in 2016, he has worked tirelessly to reshape public perceptions and attitudes toward women. His leadership combines creative communication, grassroots mobilisation, and strategic vision.",
    achievements: ["UN Women Champion", "Forbes 40 Under 40", "Harvard Alumni Award"],
    social: {
      linkedin: "https://www.linkedin.com/in/gunalancity/",
      twitter: "#",
      email: "chairman@wecanvoiceforwomen.org",
    },
  },
  {
    id: 2,
    name: "Mrs. Oorvasi Gunalan",
    title: "Secretary & Treasurer",
    image: "/oorvasi.JPG?height=300&width=300",
    bio: "With a strong academic background in mathematics and an unyielding passion for community welfare, Mrs. Oorvasi Gunalan exemplifies compassion and resilience. She has played a pivotal role in shaping the Foundation’s operations and outreach. Her dedication to counselling women, managing programs, and sustaining grassroots engagement makes her an invaluable force behind the organisation’s impact.",
    achievements: ["Wharton Leadership Award", "International Development Excellence", "Community Impact Recognition"],
    social: {
      linkedin: "https://www.linkedin.com/in/goorvasi/",
      twitter: "#",
      email: "secretary@wecanvoiceforwomen.org",
    },
  },
  {
    id: 3,
    name: "Mr. Deepak Radhakrishnan",
    title: "Head - Advisory Board",
    image: "/deepak.JPG?height=300&width=300",
    bio: "He is a seasoned professional, qualified as a Taxation Advocate and CPA (USA), with deep expertise in accounting and taxation. He is passionately committed to uplifting business standards in India, especially among underserved communities. With a visionary mindset, he focuses on nurturing entrepreneurs and empowering women to build sustainable ventures. Deepak believes in transforming potential into professionalism, one business at a time. His mission is to create a generation of confident professionals and change-makers across India.",
    achievements: ["WHO Excellence Award", "Public Health Leadership", "Medical Research Recognition"],
    social: {
      linkedin: "https://www.linkedin.com/in/deepak-radhakrishnan-40a647156/",
      twitter: "#",
      email: "amara@voiceforwomen.org",
    },
  },
  {
    id: 4,
    name: "Prof Mr. A.Md.Abdulkadhar",
    title: "Advisory Board",
    image: "/abdulkadar.jpeg?height=300&width=300",
    bio: "Professor A. Mohamed Abdul Kadhar is a distinguished educationist dedicated to the advancement of women. With a wealth of knowledge, he has authored a compelling array of articles and books that spotlight women winners, achievers, and entrepreneurs. Known for his inspiring and confident speaking style, he serves as a trusted consultant to a variety of educational institutions. His impactful work has been recognised with numerous prestigious awards. Currently, he is playing a pivotal role in shaping the We Can Voice for Women Foundation, offering valuable insights and expertise to empower women's voices and initiatives.",
    achievements: ["Tech for Good Award", "MIT Innovation Prize", "Digital Impact Recognition"],
    social: {
      linkedin: "https://www.linkedin.com/in/prof-abdul-kadhar-52877a332",
      twitter: "#",
      email: "Kadharchem@gmail.com",
    },
  },
]

export default function LeadershipPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div className="max-w-4xl mx-auto text-center" initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">Our Leadership</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Meet the visionary leaders driving change and empowering women worldwide
          </p>
        </motion.div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="md:col-span-1 bg-gray-50 flex items-center justify-center p-4">
                        <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-full border-4 border-white shadow-md mx-auto">
                          <img
                            src={leader.image || "/placeholder.svg"}
                            alt={leader.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{leader.name}</h2>
                            <p className="text-pink-600 font-medium">{leader.title}</p>
                          </div>
                          <div className="flex space-x-2 mt-2 md:mt-0">
                            <a
                              target="_blank" href={leader.social.linkedin}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`${leader.name}'s LinkedIn`}
                            >
                              <Linkedin className="h-4 w-4 text-gray-700" />
                            </a>
                            {/* <a
                              href={leader.social.twitter}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`${leader.name}'s Twitter`}
                            >
                              <Twitter className="h-4 w-4 text-gray-700" />
                            </a> */}
                            <a
                              href={`https://mail.google.com/mail/?view=cm&to=${leader.social.email}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`Email ${leader.name}`}
                            >
                              <Mail className="h-4 w-4 text-gray-700" />
                            </a>

                          </div>
                        </div>

                        <ReadMoreText text={leader.bio} maxLength={200} />

                        {/* <div className="mt-4 flex flex-wrap gap-2">
                          {leader.achievements.map((achievement) => (
                            <Badge key={achievement} variant="secondary" className="bg-pink-100 text-pink-700">
                              {achievement}
                            </Badge>
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      {/* <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Advisory Board</h2>
            <p className="text-lg text-gray-600 mb-12">
              Our advisory board consists of distinguished experts from various fields who provide strategic guidance
              and support to advance our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              { name: "Prof. Lisa Wong", title: "Education Expert" },
              { name: "Dr. James Carter", title: "Healthcare Advisor" },
              { name: "Priya Sharma", title: "Finance Specialist" },
              { name: "Michael Okonjo", title: "Legal Counsel" },
              { name: "Dr. Fatima Al-Fayez", title: "Research Director" },
              { name: "Robert Chen", title: "Technology Advisor" },
              { name: "Sophia Martinez", title: "Community Engagement" },
              { name: "Dr. Kwame Nkrumah", title: "Policy Expert" },
            ].map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-xl font-bold text-pink-600">
                        {advisor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-800 text-sm">{advisor.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{advisor.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Join Our Team */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Join Our Team</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're always looking for passionate individuals who share our vision and want to make a difference in
              women's lives around the world.
            </p>
            <a
              href="/volunteer"
              className="inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}