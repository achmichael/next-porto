import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import FloatingShapes from "@/components/floating-shapes"

// Lazy load components
const Hero = dynamic(() => import("@/components/hero"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-teal-600">Loading...</div>
    </div>
  ),
})

const About = dynamic(() => import("@/components/about"))
const Experience = dynamic(() => import("@/components/experience"))
const Projects = dynamic(() => import("@/components/projects"))
const Footer = dynamic(() => import("@/components/footer"))

export const metadata: Metadata = {
  title: "Achmad Michael Mushoharoin | Software Engineer",
  description:
    "Personal portfolio of Achmad Michael Mushoharoin, a skilled Software Engineer specializing in web development, React, Next.js, Laravel, Golang, and more.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "Laravel",
    "Golang",
    "PHP",
    "Java",
    "MongoDB",
    "MySQL",
    "GraphQL",
  ],
  authors: [{ name: "Achmad Michael Mushoharoin" }],
  creator: "Achmad Michael Mushoharoin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://achmadmichael.com",
    title: "Achmad Michael Mushoharoin | Software Engineer",
    description:
      "Personal portfolio of Achmad Michael Mushoharoin, a skilled Software Engineer specializing in web development, React, Next.js, Laravel, Golang, and more.",
    siteName: "Achmad Michael Mushoharoin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achmad Michael Mushoharoin | Software Engineer",
    description:
      "Personal portfolio of Achmad Michael Mushoharoin, a skilled Software Engineer specializing in web development, React, Next.js, Laravel, Golang, and more.",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />

      {/* Global floating shapes for additional visual interest */}
      <FloatingShapes variant="mixed" count={8} className="fixed inset-0 z-0" />
    </main>
  )
}
