"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  variant: "dots" | "circles" | "grid" | "waves"
  className?: string
  particleColor?: "teal" | "blue" | "purple" | "orange"
  particleDensity?: "low" | "medium" | "high"
}

export default function AnimatedBackground({
  variant,
  className = "",
  particleColor = "teal",
  particleDensity = "medium",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get color based on particleColor prop
  const getColor = (opacity: number): string => {
    switch (particleColor) {
      case "blue":
        return `rgba(59, 130, 246, ${opacity})`
      case "purple":
        return `rgba(139, 92, 246, ${opacity})`
      case "orange":
        return `rgba(249, 115, 22, ${opacity})`
      case "teal":
      default:
        return `rgba(20, 184, 166, ${opacity})`
    }
  }

  // Get density multiplier based on particleDensity prop
  const getDensityMultiplier = (): number => {
    switch (particleDensity) {
      case "low":
        return 0.5
      case "high":
        return 2.5
      case "medium":
      default:
        return 1
    }
  }

  // Dots animation
  useEffect(() => {
    if (variant !== "dots" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }> = []

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      // Adjust particle count based on density
      const densityMultiplier = getDensityMultiplier()
      const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / densityMultiplier))

      for (let i = 0; i < particleCount; i++) {
        // Larger radius for better visibility
        const radius = Math.random() * 2.5 + 1.5
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          // More vibrant color with higher opacity
          color: getColor(Math.random() * 0.5 + 0.3),
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections with higher opacity
        particles.forEach((particle2, j) => {
          if (i === j) return
          const dx = particle.x - particle2.x
          const dy = particle.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = getColor(0.15 * (1 - distance / 120))
            ctx.lineWidth = 0.8
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, particleColor, particleDensity])

  // Circles animation
  useEffect(() => {
    if (variant !== "circles" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let circles: Array<{
      x: number
      y: number
      radius: number
      color: string
      alpha: number
      expanding: boolean
      speed: number
    }> = []

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      initCircles()
    }

    const initCircles = () => {
      circles = []
      const densityMultiplier = getDensityMultiplier()
      const circleCount = Math.floor((canvas.width * canvas.height) / (50000 / densityMultiplier)) + 5

      for (let i = 0; i < circleCount; i++) {
        circles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 20 + 10,
          color: getColor(Math.random() * 0.15 + 0.1),
          alpha: Math.random() * 0.15 + 0.1,
          expanding: Math.random() > 0.5,
          speed: Math.random() * 0.3 + 0.1,
        })
      }
    }

    const drawCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      circles.forEach((circle) => {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fillStyle = circle.color
        ctx.fill()

        // Update radius
        if (circle.expanding) {
          circle.radius += circle.speed
          if (circle.radius > 50) circle.expanding = false
        } else {
          circle.radius -= circle.speed
          if (circle.radius < 10) circle.expanding = true
        }
      })

      animationFrameId = requestAnimationFrame(drawCircles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawCircles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, particleColor, particleDensity])

  // Grid animation
  useEffect(() => {
    if (variant !== "grid" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 30
      const lineWidth = 0.8

      ctx.strokeStyle = getColor(0.15)
      ctx.lineWidth = lineWidth

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw animated dots at intersections
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const distFromCenter = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2))
          const size = 1.5 + Math.sin(time * 0.01 + distFromCenter * 0.01) * 1.5

          if (size > 0) {
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fillStyle = getColor(0.4)
            ctx.fill()
          }
        }
      }

      time++
      animationFrameId = requestAnimationFrame(drawGrid)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, particleColor, particleDensity])

  // Waves animation
  useEffect(() => {
    if (variant !== "waves" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }

    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const waveCount = 3

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath()

        const amplitude = 20 + i * 10
        const period = 200 + i * 50
        const speed = 0.02 - i * 0.005
        const opacity = 0.15 - i * 0.03

        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            amplitude * Math.sin((x / period) * 2 * Math.PI + time * speed) +
            (amplitude / 2) * Math.sin((x / (period / 2)) * 2 * Math.PI + time * speed * 1.5)

          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, getColor(opacity))
        gradient.addColorStop(1, getColor(0))

        ctx.fillStyle = gradient
        ctx.fill()
      }

      time++
      animationFrameId = requestAnimationFrame(drawWaves)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawWaves()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, particleColor, particleDensity])

  if (variant === "dots" || variant === "circles" || variant === "grid" || variant === "waves") {
    return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full z-0 ${className}`} />
  }

  // Fallback for other variants
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${getColor(0.2)}, transparent 70%)`,
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  )
}
