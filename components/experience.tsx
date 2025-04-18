"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Briefcase, GraduationCap } from "lucide-react"
import AnimatedBackground from "./animated-background"

// Sample experience data - replace with actual data
const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description:
      "Leading development of web applications using React and Next.js. Implementing CI/CD pipelines and mentoring junior developers.",
    icon: Briefcase,
    isCurrent: true, // Mark this as the current position
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple client projects. Created RESTful APIs and integrated third-party services.",
    icon: Briefcase,
    isCurrent: false,
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "Web Creators Co.",
    period: "2018 - 2020",
    description:
      "Built responsive websites and implemented UI components. Collaborated with designers to ensure pixel-perfect implementations.",
    icon: Briefcase,
    isCurrent: false,
  },
  {
    id: 4,
    title: "Computer Science Degree",
    company: "University of Technology",
    period: "2014 - 2018",
    description: "Bachelor's degree in Computer Science with focus on software engineering and web technologies.",
    icon: GraduationCap,
    isCurrent: false,
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Create refs for each experience item
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Track which experience items are in view
  const [activeExperiences, setActiveExperiences] = useState<number[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveExperiences((prev) => {
                if (!prev.includes(index)) {
                  // Add this index to active experiences
                  const newActive = [...prev, index].sort((a, b) => a - b)
                  return newActive
                }
                return prev
              })
            } else {
              setActiveExperiences((prev) => prev.filter((i) => i !== index))
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <AnimatedBackground variant="grid" className="opacity-40 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Experience</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Continuous timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700">
              {/* Animated overlay that grows as user scrolls */}
              <div
                className="absolute top-0 left-0 w-full bg-teal-500 transition-all duration-700 ease-in-out"
                style={{
                  height:
                    activeExperiences.length > 0
                      ? `${(Math.max(...activeExperiences) / (experiences.length - 1)) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isActive = activeExperiences.includes(index)
                const isHighlighted = exp.isCurrent || isActive

                return (
                  <motion.div
                    key={exp.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex flex-col md:flex-row"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 z-10 flex items-center justify-center transition-all duration-500 ${
                        isHighlighted
                          ? "border-teal-500 text-teal-500 scale-110 shadow-lg shadow-teal-500/20"
                          : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <exp.icon className="h-4 w-4" />
                    </div>

                    {/* Content for left side (date on mobile, content on desktop) */}
                    <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                      <div className="md:hidden mb-1 flex items-center text-teal-600 dark:text-teal-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                      <div className="hidden md:block">
                        {index % 2 === 0 ? (
                          <>
                            <motion.h3
                              initial={{ x: -20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: -20, opacity: 0.7 }}
                              transition={{ duration: 0.5 }}
                              className={`text-xl font-bold ${isHighlighted ? "text-teal-600 dark:text-teal-400" : "text-gray-900 dark:text-white"}`}
                            >
                              {exp.title}
                            </motion.h3>
                            <motion.h4
                              initial={{ x: -20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: -20, opacity: 0.7 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="text-lg font-medium text-teal-600 dark:text-teal-400"
                            >
                              {exp.company}
                            </motion.h4>
                            <motion.p
                              initial={{ x: -20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: -20, opacity: 0.7 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="mt-2 text-gray-700 dark:text-gray-300"
                            >
                              {exp.description}
                            </motion.p>
                            {exp.isCurrent && (
                              <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.7 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="inline-block mt-2 px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs"
                              >
                                Current Position
                              </motion.span>
                            )}
                          </>
                        ) : (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={isActive ? { x: 0, opacity: 1 } : { x: -20, opacity: 0.7 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-end text-teal-600 dark:text-teal-400"
                          >
                            <span>{exp.period}</span>
                            <Calendar className="h-4 w-4 ml-1" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Content for right side (content on mobile, date on desktop) */}
                    <div className="md:w-1/2 md:pl-12 pl-12 md:mt-0">
                      <div className="hidden md:block">
                        {index % 2 === 1 ? (
                          <>
                            <motion.h3
                              initial={{ x: 20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                              transition={{ duration: 0.5 }}
                              className={`text-xl font-bold ${isHighlighted ? "text-teal-600 dark:text-teal-400" : "text-gray-900 dark:text-white"}`}
                            >
                              {exp.title}
                            </motion.h3>
                            <motion.h4
                              initial={{ x: 20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="text-lg font-medium text-teal-600 dark:text-teal-400"
                            >
                              {exp.company}
                            </motion.h4>
                            <motion.p
                              initial={{ x: 20, opacity: 0 }}
                              animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="mt-2 text-gray-700 dark:text-gray-300"
                            >
                              {exp.description}
                            </motion.p>
                            {exp.isCurrent && (
                              <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.7 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="inline-block mt-2 px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs"
                              >
                                Current Position
                              </motion.span>
                            )}
                          </>
                        ) : (
                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center text-teal-600 dark:text-teal-400"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{exp.period}</span>
                          </motion.div>
                        )}
                      </div>
                      <div className="md:hidden">
                        <motion.h3
                          initial={{ x: 20, opacity: 0 }}
                          animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                          transition={{ duration: 0.5 }}
                          className={`text-xl font-bold ${isHighlighted ? "text-teal-600 dark:text-teal-400" : "text-gray-900 dark:text-white"}`}
                        >
                          {exp.title}
                        </motion.h3>
                        <motion.h4
                          initial={{ x: 20, opacity: 0 }}
                          animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-lg font-medium text-teal-600 dark:text-teal-400"
                        >
                          {exp.company}
                        </motion.h4>
                        <motion.p
                          initial={{ x: 20, opacity: 0 }}
                          animate={isActive ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.7 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mt-2 text-gray-700 dark:text-gray-300"
                        >
                          {exp.description}
                        </motion.p>
                        {exp.isCurrent && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.7 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-block mt-2 px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs"
                          >
                            Current Position
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
