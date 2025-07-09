"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-500/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-purple-500/10 rounded-full"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 bg-pink-500/10 rounded-full"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-5 h-5 bg-blue-400/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Floating squares */}
      <motion.div
        className="absolute top-60 left-1/4 w-2 h-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rotate-45"
        animate={{
          y: [0, -30, 0],
          rotate: [45, 135, 45],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-60 right-1/4 w-3 h-3 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rotate-45"
        animate={{
          y: [0, 25, 0],
          rotate: [45, -45, 45],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  )
}
