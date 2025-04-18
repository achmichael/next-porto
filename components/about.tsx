"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import AnimatedBackground from "./animated-background"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground variant="circles" className="opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-teal-500/20 rounded-lg transform rotate-6"></div>
            <div className="absolute inset-0 bg-teal-600/20 rounded-lg transform -rotate-3"></div>
            <div className="relative h-full w-full overflow-hidden rounded-lg border-2 border-teal-500 shadow-xl group">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Achmad Michael Mushoharoin"
                width={500}
                height={500}
                className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Who am I?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I am Achmad Michael Mushoharoin, a passionate Software Engineer with a keen eye for creating elegant
              solutions to complex problems. My journey in the world of technology has equipped me with a diverse skill
              set and a deep understanding of software development principles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I specialize in building responsive web applications using modern technologies like React, Next.js, and
              Node.js. I believe in writing clean, maintainable code that delivers exceptional user experiences.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing my knowledge with the developer community.
            </p>

            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">My Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Laravel",
                  "PHP",
                  "Java",
                  "Golang",
                  "MongoDB",
                  "MySQL",
                  "GraphQL",
                  "Tailwind CSS",
                  "Git",
                  "RESTful APIs",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-sm group relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                    <span className="absolute inset-0 bg-teal-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
