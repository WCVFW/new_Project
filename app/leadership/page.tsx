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
    image: "/placeholder.svg?height=300&width=300",
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
                          className="w-full h-96 lg:h-full object-cover"
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

                          <div className="flex flex-wrap gap-2 mb-6">
                            {leader.achievements.map((achievement) => (
                              <Badge key={achievement} variant="secondary" className="bg-pink-100 text-pink-700">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
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
