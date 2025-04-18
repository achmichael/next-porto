"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import AnimatedBackground from "./animated-background"

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated background with increased opacity */}
      <AnimatedBackground variant="dots" className="opacity-80 z-0" particleColor="teal" particleDensity="high" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-teal-600 dark:text-teal-400 font-medium mb-4"
          >
            Hello, I am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Achmad Michael Mushoharoin
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
              I am a <span className="text-teal-600 dark:text-teal-400 font-semibold">Software Engineer</span>{" "}
              passionate about building exceptional digital experiences
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              onClick={scrollToAbout}
              className="group bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center mx-auto overflow-hidden relative"
              aria-label="Learn more about Achmad Michael Mushoharoin"
            >
              <span className="relative z-10 flex items-center">
                Learn more
                <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-teal-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
