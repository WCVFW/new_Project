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
    name: "Dr. Sarah Johnson",
    title: "Founder & CEO",
    image: "/gunalan.JPG?height=300&width=300",
    bio: "Dr. Sarah Johnson is a visionary leader with over 20 years of experience in international development and women's rights advocacy. She founded Voice for Women Foundation in 2015 after witnessing firsthand the challenges faced by women in underserved communities during her work with the United Nations. Under her leadership, the foundation has grown from a small grassroots organization to a global movement impacting thousands of lives. Dr. Johnson holds a PhD in International Development from Harvard University and has been recognized with numerous awards for her humanitarian work. She is a frequent speaker at international conferences and has authored several publications on women's empowerment and sustainable development. Her passion for creating systemic change drives the foundation's innovative approach to addressing gender inequality worldwide.",
    achievements: ["UN Women Champion", "Forbes 40 Under 40", "Harvard Alumni Award"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@voiceforwomen.org",
    },
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    title: "Chief Operating Officer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Maria Rodriguez brings exceptional operational expertise to Voice for Women Foundation, overseeing the implementation of programs across 35 countries. With a background in international business and nonprofit management, she has been instrumental in scaling the foundation's impact while maintaining the highest standards of accountability and transparency. Maria previously served as Regional Director for several major international NGOs, where she developed innovative approaches to program delivery and community engagement. She holds an MBA from Wharton School and speaks five languages fluently. Her multicultural background and deep understanding of diverse communities enable her to build strong partnerships and ensure culturally sensitive program implementation. Maria is passionate about creating sustainable systems that empower local communities to drive their own development.",
    achievements: ["Wharton Leadership Award", "International Development Excellence", "Community Impact Recognition"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "maria@voiceforwomen.org",
    },
  },
  {
    id: 3,
    name: "Dr. Amara Okafor",
    title: "Director of Programs",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Amara Okafor leads the foundation's program development and implementation, bringing deep expertise in education, healthcare, and economic empowerment initiatives. With a doctorate in Public Health from Johns Hopkins University, she has dedicated her career to addressing health disparities and improving access to quality healthcare for marginalized communities. Before joining Voice for Women, Dr. Okafor worked with the World Health Organization and Doctors Without Borders, implementing health programs in conflict-affected regions. Her research on maternal health and women's healthcare access has been published in leading medical journals. She is particularly passionate about integrating health services with education and economic empowerment programs to create holistic support systems for women and girls.",
    achievements: ["WHO Excellence Award", "Public Health Leadership", "Medical Research Recognition"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "amara@voiceforwomen.org",
    },
  },
  {
    id: 4,
    name: "Jennifer Chen",
    title: "Chief Technology Officer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Jennifer Chen revolutionizes how Voice for Women Foundation leverages technology to amplify its impact and reach. With over 15 years of experience in tech innovation and digital transformation, she leads the development of cutting-edge platforms that connect women globally and provide access to resources, education, and opportunities. Jennifer previously held senior positions at major tech companies, where she specialized in building scalable solutions for social impact. She holds a Master's degree in Computer Science from MIT and is a recognized expert in using artificial intelligence and machine learning for social good. Under her leadership, the foundation has launched several award-winning digital platforms that have transformed how women access support and resources worldwide.",
    achievements: ["Tech for Good Award", "MIT Innovation Prize", "Digital Impact Recognition"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "jennifer@voiceforwomen.org",
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
                              href={leader.social.linkedin}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`${leader.name}'s LinkedIn`}
                            >
                              <Linkedin className="h-4 w-4 text-gray-700" />
                            </a>
                            <a
                              href={leader.social.twitter}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`${leader.name}'s Twitter`}
                            >
                              <Twitter className="h-4 w-4 text-gray-700" />
                            </a>
                            <a
                              href={`mailto:${leader.social.email}`}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                              aria-label={`Email ${leader.name}`}
                            >
                              <Mail className="h-4 w-4 text-gray-700" />
                            </a>
                          </div>
                        </div>

                        <ReadMoreText text={leader.bio} maxLength={200} />

                        <div className="mt-4 flex flex-wrap gap-2">
                          {leader.achievements.map((achievement) => (
                            <Badge key={achievement} variant="secondary" className="bg-pink-100 text-pink-700">
                              {achievement}
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

      {/* Advisory Board */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
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
      </section>

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
