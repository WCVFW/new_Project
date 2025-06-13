"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, ArrowRight, Play, Volume2, Star, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import Header from "./components/header"
import Footer from "./components/footer"
import MediaCarousel from "./components/media-carousel"
import MarqueeText from "./components/marquee-text"
import ReadMoreText from "./components/read-more-text"
import ParallaxSection from "./components/parallax-section"
import CountUpAnimation from "./components/count-up-animation"
import { useState, useRef } from "react"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const scaleOnHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 },
  }

  const playVoiceMessage = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-hidden"
    >
      <Header />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 via-purple-900/20 to-rose-900/30 z-10" />
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Women empowerment background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floating Animation Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-pink-200/40 rounded-full blur-xl"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200/40 rounded-full blur-xl"
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-200/40 rounded-full blur-lg"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Hero Content */}
        <motion.div
          className="max-w-6xl mx-auto text-center relative z-20 px-4"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Logo with Pulse Animation */}
          <motion.div
            className="mb-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 bg-pink-400/30 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Voice for Women Logo"
                className="relative mx-auto rounded-full border-4 border-pink-300 shadow-2xl w-32 h-32 md:w-40 md:h-40"
              />
              <motion.div
                className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-600" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title with Gradient Text */}
          <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6" variants={fadeInUp}>
            <motion.span
              className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Voice
            </motion.span>
            <span className="text-gray-800"> for </span>
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Women
            </motion.span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div className="text-3xl md:text-5xl font-semibold text-purple-600 mb-8" variants={fadeInUp}>
            <motion.span
              animate={{
                scale: [1, 1.05, 1],
                color: ["#9333ea", "#ec4899", "#f43f5e", "#9333ea"],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              Empowering Every Dream
            </motion.span>
          </motion.div>

          {/* Voice Message Button */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <motion.div {...scaleOnHover}>
              <Button
                onClick={playVoiceMessage}
                className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-700 hover:via-rose-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-xl shadow-2xl"
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Volume2 className="mr-3 h-8 w-8" />
                    </motion.div>
                    Playing Our Voice...
                  </>
                ) : (
                  <>
                    <Play className="mr-3 h-8 w-8" />
                    Hear Our Voice
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Description with Typewriter Effect */}
          <motion.div variants={fadeInUp} className="mb-12">
            <ReadMoreText
              text="Join us in our revolutionary mission to amplify women's voices worldwide through comprehensive education programs, accessible healthcare initiatives, sustainable economic opportunities, and transformative leadership development. We believe every woman deserves the chance to not just survive, but to thrive and lead in her community. Our foundation has been working tirelessly since 2015 to break down systemic barriers, challenge societal norms, and create lasting change that ripples through generations. Together, we're not just changing individual lives – we're reshaping the future for all women."
              maxLength={200}
              className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed"
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
            <motion.div {...scaleOnHover}>
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-12 py-6 rounded-full shadow-2xl text-lg"
                >
                  <Heart className="mr-3 h-6 w-6" />
                  Donate Now
                </Button>
              </Link>
            </motion.div>
            <motion.div {...scaleOnHover}>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-12 py-6 rounded-full shadow-xl text-lg backdrop-blur-sm bg-white/80"
                >
                  Learn More <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-pink-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee News Section */}
      <section className="py-6 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <MarqueeText text="🎉 Breaking News: Voice for Women Foundation reaches 15,000 women empowered milestone! • 📚 New scholarship program launched in 5 countries • 🏥 Mobile healthcare units now serving rural communities • 💼 1,000+ women entrepreneurs supported this year • 🌟 Join our upcoming Global Women's Summit 2024" />
      </section>

      {/* Parallax Section with Images */}
      <ParallaxSection>
        <section className="py-20 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Our Global Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transforming lives across continents through innovative programs and unwavering dedication
              </p>
            </motion.div>

            {/* Impact Grid with Images */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  count: 15000,
                  label: "Women Empowered",
                  image: "/placeholder.svg?height=200&width=300",
                  color: "pink",
                },
                {
                  icon: Award,
                  count: 1200,
                  label: "Scholarships Awarded",
                  image: "/placeholder.svg?height=200&width=300",
                  color: "purple",
                },
                {
                  icon: Heart,
                  count: 35,
                  label: "Countries Reached",
                  image: "/placeholder.svg?height=200&width=300",
                  color: "rose",
                },
                {
                  icon: Globe,
                  count: 500,
                  label: "Local Partners",
                  image: "/placeholder.svg?height=200&width=300",
                  color: "indigo",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={stat.image || "/placeholder.svg"}
                          alt={stat.label}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <stat.icon className="h-8 w-8 mb-2" />
                        </div>
                      </div>
                      <div className="p-6 text-center">
                        <motion.h3
                          className={`text-4xl font-bold text-${stat.color}-600 mb-2`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <CountUpAnimation end={stat.count} duration={2} />+
                        </motion.h3>
                        <p className="text-gray-600 font-medium">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Media Carousel Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Stories of Transformation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Witness the incredible journeys of women who dared to dream and achieved the extraordinary
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MediaCarousel />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section with Parallax Images */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <motion.img
                  src="/placeholder.svg?height=600&width=500"
                  alt="Women empowerment mission"
                  className="rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-3xl shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <p className="font-bold text-3xl">9 Years</p>
                  <p className="text-lg">of Impact</p>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-yellow-400 p-4 rounded-full shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Star className="h-6 w-6 text-yellow-600" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-800 mb-8">
                Our <span className="text-pink-600">Mission</span>
              </h2>
              <ReadMoreText
                text="Voice for Women Foundation stands as a beacon of hope and transformation in the global fight for women's equality and empowerment. Since our inception in 2015, we have been dedicated to creating sustainable change through innovative programs that address the root causes of gender inequality. Our comprehensive approach encompasses education, healthcare, economic empowerment, and leadership development, ensuring that every woman we serve has the tools and opportunities needed to build a better future for herself and her community. We work closely with local partners, governments, and international organizations to create lasting impact that transcends borders and generations."
                maxLength={300}
                className="text-lg text-gray-700 leading-relaxed mb-8"
              />

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Heart, label: "Healthcare Access", count: "50K+" },
                  { icon: Users, label: "Education Support", count: "15K+" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-gray-800">{item.count}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg shadow-xl">
                    Discover Our Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action with Background Image */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=600&width=1200"
            alt="Join our mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-900/70 to-rose-900/80" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Join the Movement</h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Every donation, every voice, every action creates ripples of change that transform lives across the globe
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-gray-100 px-12 py-6 rounded-full text-lg shadow-2xl"
                >
                  <Heart className="mr-3 h-6 w-6" />
                  Make a Donation
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/volunteer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-12 py-6 rounded-full text-lg backdrop-blur-sm"
                >
                  <Users className="mr-3 h-6 w-6" />
                  Volunteer Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
