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
    image: "/gunalan.jpg?height=200&width=300",
    bio: "A seasoned media professional with over 2 decades of experience, Mr. Gunalan Lavanyan is a passionate advocate for social justice. Since initiating the We Can Voice for Women movement in 2016, he has worked tirelessly to reshape public perceptions and attitudes toward women. His leadership combines creative communication, grassroots mobilisation, and strategic vision.",
    achievements: ["UN Women Champion", "Forbes 40 Under 40", "Harvard Alumni Award"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@voiceforwomen.org",
    },
  },
  {
    id: 2,
    name: "Mrs. Oorvasi Gunalan",
    title: "Secretary & Treasurer",
    image: "/oorvasi.jpg?height=300&width=300",
    bio: "With a strong academic background in mathematics and an unyielding passion for community welfare, Mrs. Oorvasi Gunalan exemplifies compassion and resilience. She has played a pivotal role in shaping the Foundation’s operations and outreach. Her dedication to counselling women, managing programs, and sustaining grassroots engagement makes her an invaluable force behind the organisation’s impact.",
    achievements: ["Wharton Leadership Award", "International Development Excellence", "Community Impact Recognition"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "maria@voiceforwomen.org",
    },
  },
  {
    id: 3,
    name: "Mr. Deepak Radhakrishnan",
    title: "Head - Advisory Board",
    image: "/deepak.jpg?height=300&width=300",
    bio: "He is a seasoned professional, qualified as a Taxation Advocate and CPA (USA), with deep expertise in accounting and taxation. He is passionately committed to uplifting business standards in India, especially among underserved communities. With a visionary mindset, he focuses on nurturing entrepreneurs and empowering women to build sustainable ventures. Deepak believes in transforming potential into professionalism, one business at a time. His mission is to create a generation of confident professionals and change-makers across India.",
    achievements: ["WHO Excellence Award", "Public Health Leadership", "Medical Research Recognition"],
    social: {
      linkedin: "#",
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
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div className="max-w-4xl mx-auto text-center" initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">Our Leadership</h1>
          <p className="text-xl text-gray-600">
            Meet the visionary leaders driving change and empowering women worldwide
          </p>
        </motion.div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                      <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <img
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          className="w-full h-[800px] lg:h-half object-cover"

                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent" />

                        {/* Social Links */}
                        <div className="absolute bottom-6 left-6 flex space-x-3">
                          <a
                            href={leader.social.linkedin}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Linkedin className="h-5 w-5 text-pink-600" />
                          </a>
                          <a
                            href={leader.social.twitter}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Twitter className="h-5 w-5 text-pink-600" />
                          </a>
                          <a
                            href={`mailto:${leader.social.email}`}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Mail className="h-5 w-5 text-pink-600" />
                          </a>
                        </div>
                      </div>

                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h2 className="text-3xl font-bold text-gray-800 mb-2">{leader.name}</h2>
                          <p className="text-xl text-pink-600 font-medium mb-4">{leader.title}</p>

                          {/* <div className="flex flex-wrap gap-2 mb-6">
                            {leader.achievements.map((achievement) => (
                              <Badge key={achievement} variant="secondary" className="bg-pink-100 text-pink-700">
                                {achievement}
                              </Badge>
                            ))}
                          </div> */}
                        </div>

                        <ReadMoreText text={leader.bio} maxLength={300} className="text-gray-600 leading-relaxed" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Board of Directors</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Elizabeth Warren", title: "Board Chair", company: "Former Senator" },
              { name: "Melinda Gates", title: "Vice Chair", company: "Philanthropist" },
              { name: "Oprah Winfrey", title: "Board Member", company: "Media Mogul" },
              { name: "Dr. Vandana Shiva", title: "Board Member", company: "Environmental Activist" },
              { name: "Chimamanda Ngozi Adichie", title: "Board Member", company: "Author & Activist" },
              { name: "Dr. Leymah Gbowee", title: "Board Member", company: "Nobel Peace Laureate" },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent>
                    <img
                      src="/placeholder.svg?height=150&width=150"
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-pink-600 font-medium mb-1">{member.title}</p>
                    <p className="text-sm text-gray-600">{member.company}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
