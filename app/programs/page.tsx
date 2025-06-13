"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Heart, Briefcase, Users, ArrowRight } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import ReadMoreText from "../components/read-more-text"

const programs = [
  {
    id: 1,
    title: "Education Empowerment",
    icon: GraduationCap,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Our flagship education program provides scholarships, mentorship, and educational resources to girls and women worldwide. We believe education is the foundation of empowerment, opening doors to opportunities and breaking cycles of poverty. Through partnerships with schools, universities, and educational institutions, we've helped over 1,200 women pursue their academic dreams. Our program includes not just financial support, but also mentorship from successful women leaders, career guidance, and life skills training. We work with local communities to address cultural barriers to education and create supportive environments where girls can thrive academically.",
    impact: "1,200+ scholarships awarded",
    color: "pink",
  },
  {
    id: 2,
    title: "Healthcare Access",
    icon: Heart,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Healthcare is a fundamental right, yet millions of women lack access to basic medical services. Our healthcare program brings essential medical care directly to underserved communities through mobile clinics, telemedicine services, and partnerships with local healthcare providers. We focus on maternal health, reproductive rights, mental health support, and preventive care. Our trained healthcare workers provide education on health and wellness, conduct regular health screenings, and ensure women have access to life-saving treatments. We've established health centers in remote areas and trained local women to become community health advocates.",
    impact: "50,000+ women served",
    color: "rose",
  },
  {
    id: 3,
    title: "Economic Empowerment",
    icon: Briefcase,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Economic independence is crucial for women's empowerment and gender equality. Our economic empowerment program provides microfinance, business training, and entrepreneurship support to help women start and grow their own businesses. We offer financial literacy workshops, mentorship from successful entrepreneurs, and access to markets for women-owned businesses. Our program has helped establish over 2,000 women-led enterprises, creating jobs and stimulating local economies. We also advocate for fair wages, workplace equality, and women's rights in the workplace through policy initiatives and corporate partnerships.",
    impact: "2,000+ businesses launched",
    color: "purple",
  },
  {
    id: 4,
    title: "Leadership Development",
    icon: Users,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Strong female leadership is essential for creating lasting change in communities worldwide. Our leadership development program identifies and nurtures emerging women leaders through comprehensive training, networking opportunities, and leadership roles in community projects. We provide workshops on public speaking, project management, advocacy, and governance. Our alumni network includes women who have gone on to become community leaders, politicians, business executives, and social entrepreneurs. We believe that when women lead, communities thrive, and our program is designed to create a pipeline of confident, capable women leaders.",
    impact: "500+ leaders trained",
    color: "indigo",
  },
]

export default function ProgramsPage() {
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
          <h1 className="text-6xl font-bold text-gray-800 mb-6">Our Programs</h1>
          <p className="text-xl text-gray-600">
            Comprehensive initiatives designed to empower women through education, healthcare, economic opportunities,
            and leadership development
          </p>
        </motion.div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                      <div className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          className="w-full h-96 lg:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Impact Badge */}
                        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                          <p className="text-sm font-semibold text-gray-800">{program.impact}</p>
                        </div>
                      </div>

                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <div className="flex items-center mb-4">
                            <div className={`p-3 rounded-full bg-${program.color}-100 mr-4`}>
                              <program.icon className={`h-8 w-8 text-${program.color}-600`} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">{program.title}</h2>
                          </div>
                        </div>

                        <ReadMoreText
                          text={program.description}
                          maxLength={250}
                          className="text-gray-600 leading-relaxed mb-6"
                        />

                        <Button className={`bg-${program.color}-600 hover:bg-${program.color}-700 text-white w-fit`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Your support helps us expand these life-changing programs to reach even more women worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3">
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3"
            >
              Volunteer
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
