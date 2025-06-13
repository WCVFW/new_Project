"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const values = [
    {
      icon: Users,
      title: "Empowerment",
      description: "We believe in empowering women to become leaders and change-makers in their communities.",
    },
    {
      icon: Target,
      title: "Impact",
      description: "Every program we run is designed to create measurable, lasting impact in women's lives.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in all our initiatives, ensuring quality and effectiveness.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Our mission extends across borders, reaching women in communities worldwide.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div className="max-w-4xl mx-auto text-center" initial="initial" animate="animate" variants={fadeInUp}>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About WomenRise</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded in 2015, WomenRise has been at the forefront of women's empowerment, creating opportunities and
            breaking barriers for women across the globe.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To empower women worldwide by providing access to education, healthcare, and economic opportunities that
                enable them to reach their full potential and become leaders in their communities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work tirelessly to break down systemic barriers and create pathways for women to thrive in all
                aspects of life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A world where every woman has equal opportunities to succeed, lead, and make meaningful contributions to
                society, regardless of her background or circumstances.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision communities where women's voices are heard, their talents are recognized, and their
                potential is fully realized.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.div className="max-w-6xl mx-auto" initial="initial" whileInView="animate" viewport={{ once: true }}>
          <motion.h2 className="text-4xl font-bold text-center text-gray-800 mb-12" variants={fadeInUp}>
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <CardContent>
                    <value.icon className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Impact Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Since our founding, we've grown from a small grassroots organization to a global movement. Our programs have
            reached over 10,000 women across 25 countries, providing scholarships, healthcare access, and business
            training.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every success story fuels our passion and commitment to continue this vital work. Together, we're not just
            changing individual lives – we're transforming entire communities.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
