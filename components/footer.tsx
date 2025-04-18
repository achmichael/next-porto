"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import AnimatedBackground from "./animated-background"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground variant="dots" className="opacity-30 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4"
          >
            AM
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-6 mb-8"
          >
            <a
              href="https://github.com/achmichael"
              className="group relative text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-2"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/achmad-michael-2b84b928b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="group relative text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
            <a
              href="#"
              className="group relative text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-2"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
            <a
              href="mailto:achmadmichael03@gmail.com"
              className="group relative text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-2"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              &copy; {currentYear} Achmad Michael Mushoharoin. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
