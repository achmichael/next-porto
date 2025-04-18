"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FloatingShapesProps {
  variant: "bubbles" | "squares" | "triangles" | "mixed"
  count?: number
  className?: string
}

export default function FloatingShapes({ variant, count = 15, className = "" }: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [shapes, setShapes] = useState<Array<{
    id: number
    size: number
    xPos: number
    yPos: number
    duration: number
    delay: number
    opacity: number
    rotation: number
    shapeType: "bubbles" | "squares" | "triangles"
  }>>([]);
  
  useEffect(() => {
    const shapes = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 60 + 20
      const xPos = Math.random() * 100
      const yPos = Math.random() * 100
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      const opacity = Math.random() * 0.15 + 0.05
      const rotation = Math.random() * 360
  
      let shapeType: "bubbles" | "squares" | "triangles" = "bubbles";
      if (variant === "mixed") {
        const types: Array<"bubbles" | "squares" | "triangles"> = ["bubbles", "squares", "triangles"];
        shapeType = types[Math.floor(Math.random() * types.length)];
      } else {
        shapeType = variant;
      }
      if (variant === "mixed") {
        const types = ["bubbles", "squares", "triangles"]
        shapeType = types[Math.floor(Math.random() * types.length)] as "bubbles" | "squares" | "triangles"
      }
  
      return {
        id: i,
        size,
        xPos,
        yPos,
        duration,
        delay,
        opacity,
        rotation,
        shapeType,
      }
    })

    setShapes(shapes);
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.xPos}%`,
            top: `${shape.yPos}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, shape.rotation, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape.shapeType === "bubbles" && (
            <div
              className="w-full h-full rounded-full border-2 border-teal-500/30 dark:border-teal-400/30"
              style={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            />
          )}
          {shape.shapeType === "squares" && (
            <div
              className="w-full h-full border-2 border-teal-500/30 dark:border-teal-400/30"
              style={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            />
          )}
          {shape.shapeType === "triangles" && (
            <div
              className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent"
              style={{ borderBottomColor: "rgba(45, 212, 191, 0.2)" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
