"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import AnimatedBackground from "./animated-background"
import belanjaOnline from '../public/belanja-online.png';
import taskManagement from '../public/task-management-app.png';
import currency from '../public/currency.png';
import fitnessHub from '../public/fitness-hub.png';
import graphQL from '../public/graphQL.png';
import portfolio from '../public/portfolio.png';
import santoso from '../public/santoso.png';
import branding from '../public/branding.png';

// Sample project data - replace with actual data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
    image: belanjaOnline,
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: taskManagement,
    tags: ["React", 'Express', 'MySQL'],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A responsive portfolio website with smooth animations and modern design.",
    image: portfolio,
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Currency",
    description: "A currency converter app that provides real-time exchange rates and conversion functionality.",
    image: currency,
    tags: ["React", "OpenWeather API", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Fitness Hub",
    description: "A fitness tracking app that helps users monitor their workouts and progress.",
    image: fitnessHub,
    tags: ["PHP Native", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: 'GraphQL API',
    description: 'A GraphQL API for managing food recipes and ingredients with Authentication and Authorization.',
    image: graphQL,
    tags: ['Next JS', 'MongoDB'],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "Santoso",
    description: "A company profile website for Santoso, showcasing their services and cigarettes.",
    image: santoso,
    tags: ["React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "Branding Project",
    description: "A branding is a company or product identity design project, including logo and visual elements.",
    image: branding,
    tags: ["Next JS", "MongoDB", 'Tailwind CSS', 'Cloudinary'],
    liveUrl: "#",
    githubUrl: "#",
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  const goToProject = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-28 bg-white dark:bg-gray-950 relative overflow-hidden"
      aria-label="Projects"
    >
      {/* Animated background */}
      <AnimatedBackground variant="waves" className="opacity-30 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Project Slider */}
          <div
            className="overflow-hidden rounded-xl shadow-2xl"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={projects[currentIndex].image || "/placeholder.svg"}
                    alt={`Screenshot of ${projects[currentIndex].title} project`}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{projects[currentIndex].title}</h3>
                    <p className="text-white/90 mb-4 max-w-2xl">{projects[currentIndex].description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects[currentIndex].tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={projects[currentIndex].liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden flex items-center gap-1 text-white bg-teal-600 hover:bg-teal-600 px-4 py-2 rounded-lg transition-colors"
                        aria-label={`View live demo of ${projects[currentIndex].title}`}
                      >
                        <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </span>
                        <span className="absolute inset-0 bg-teal-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                      </a>
                      <a
                        href={projects[currentIndex].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden flex items-center gap-1 text-white bg-gray-800 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
                        aria-label={`View source code of ${projects[currentIndex].title} on GitHub`}
                      >
                        <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </span>
                        <span className="absolute inset-0 bg-gray-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-6 gap-2" role="tablist" aria-label="Project slides">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-teal-500 w-6"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-teal-300 dark:hover:bg-teal-700"
                }`}
                aria-label={`Go to project ${index + 1}: ${project.title}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        </div>

        {/* More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">More Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`Screenshot of ${project.title} project`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded-full transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white bg-gray-800 hover:bg-gray-900 px-3 py-1 rounded-full transition-colors"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <Github className="h-3 w-3" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs group-hover:bg-teal-200 dark:group-hover:bg-teal-800/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
