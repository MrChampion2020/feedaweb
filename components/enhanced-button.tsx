"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface EnhancedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function EnhancedButton({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: EnhancedButtonProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300"
  const variantClasses = {
    default:
      "bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white",
    ghost: "text-blue-900 hover:bg-blue-50",
  }
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  // Check if the button has a dark background to determine text color
  const isDarkButton =
    className.includes("bg-gradient-to-r from-blue-") ||
    className.includes("bg-gradient-to-r from-green-") ||
    className.includes("bg-gradient-to-r from-gray-") ||
    className.includes("bg-gradient-to-r from-purple-") ||
    variant === "default"

  const textColorClass = isDarkButton ? "text-white" : ""

  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="inline-block">
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${textColorClass} ${className} rounded-full group`}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Button>
    </motion.div>
  )
}
