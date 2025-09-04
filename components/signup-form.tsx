"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EnhancedButton } from "@/components/enhanced-button"
import { X, Eye, EyeOff, CheckCircle } from "lucide-react"

interface SignupFormProps {
  onClose: () => void
}

interface FormData {
  fullName: string
  username: string
  email: string
  password: string
  securityAnswer1: string
  securityAnswer2: string
  securityAnswer3: string
}

interface FormErrors {
  [key: string]: string
}

export function SignupForm({ onClose }: SignupFormProps) {
  const [step, setStep] = useState(1) // 1: Basic info, 2: Security questions, 3: OTP verification, 4: Success
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [otp, setOtp] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    securityAnswer1: "",
    securityAnswer2: "",
    securityAnswer3: "",
  })

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name is too short"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username is too short"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.securityAnswer1.trim()) {
      newErrors.securityAnswer1 = "Security answer 1 is required"
    }
    if (!formData.securityAnswer2.trim()) {
      newErrors.securityAnswer2 = "Security answer 2 is required"
    }
    if (!formData.securityAnswer3.trim()) {
      newErrors.securityAnswer3 = "Security answer 3 is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOtp = (): boolean => {
    const newErrors: FormErrors = {}

    if (!otp.trim()) {
      newErrors.otp = "OTP is required"
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep1()) return

    setIsLoading(true)
    try {
      const response = await fetch("https://feeda-5rz1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          username: formData.username.toLowerCase().trim(),
          fullName: formData.fullName.trim(),
          password: formData.password,
          securityAnswers: {
            q1: "temp", // Will be updated in step 2
            q2: "temp",
            q3: "temp",
          },
          deviceId: "web-signup-" + Date.now(),
        }),
      })

      if (response.ok) {
        setStep(2)
        setErrors({})
      } else {
        const errorData = await response.json()
        setErrors({ general: errorData.message || "Signup failed" })
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    setIsLoading(true)
    try {
      // Update security answers
      const response = await fetch("https://feeda.onrender.com/api/auth/update-security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          securityAnswers: {
            q1: formData.securityAnswer1,
            q2: formData.securityAnswer2,
            q3: formData.securityAnswer3,
          },
        }),
      })

      if (response.ok) {
        // Generate OTP
        const otpResponse = await fetch("https://feeda.onrender.com/api/auth/generate-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email.toLowerCase().trim() }),
        })

        if (otpResponse.ok) {
          setStep(3)
          setErrors({})
        } else {
          const errorData = await otpResponse.json()
          setErrors({ general: errorData.message || "Failed to send OTP" })
        }
      } else {
        const errorData = await response.json()
        setErrors({ general: errorData.message || "Failed to update security answers" })
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateOtp()) return

    setIsLoading(true)
    try {
      const response = await fetch("https://feeda.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          otp: otp.trim(),
        }),
      })

      if (response.ok) {
        setStep(4)
        setErrors({})
      } else {
        const errorData = await response.json()
        setErrors({ otp: errorData.message || "Verification failed" })
      }
    } catch (error) {
      setErrors({ otp: "Network error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    try {
      const response = await fetch("https://feeda.onrender.com/api/auth/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.toLowerCase().trim() }),
      })

      if (response.ok) {
        setErrors({ otp: "OTP resent successfully!" })
      } else {
        const errorData = await response.json()
        setErrors({ otp: errorData.message || "Failed to resend OTP" })
      }
    } catch (error) {
      setErrors({ otp: "Failed to resend OTP" })
    } finally {
      setIsResending(false)
    }
  }

  const handleDownloadApp = (platform: "android" | "ios") => {
    const link = document.createElement("a")
    if (platform === "android") {
      link.href = "/downloads/feeda-android.apk"
      link.download = "feeda-android.apk"
    } else {
      link.href = "/downloads/feeda-ios.ipa"
      link.download = "feeda-ios.ipa"
    }
    link.click()
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg h-full flex flex-col">
          <CardContent className="p-6 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {step === 1 && "Create Account"}
                  {step === 2 && "Security Questions"}
                  {step === 3 && "Verify Account"}
                  {step === 4 && "Welcome to Feeda!"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {step === 1 && "Join Feeda today!"}
                  {step === 2 && "Set up your security answers"}
                  {step === 3 && `Enter the OTP sent to ${formData.email}`}
                  {step === 4 && "Your account has been created successfully"}
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Progress indicator */}
            {step < 4 && (
              <div className="flex items-center mb-6">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* General error */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Content area with proper spacing */}
            <div className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter full name"
                      className={`w-full ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="Enter username"
                      className={`w-full ${errors.username ? "border-red-500" : ""}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className={`w-full ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter password"
                        className={`w-full pr-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <EnhancedButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isLoading ? "Creating Account..." : "Next"}
                  </EnhancedButton>

                  <p className="text-xs text-gray-500 text-center">
                    By continuing you agree with Feeda{" "}
                    <span className="text-blue-600 underline cursor-pointer">terms of agreement</span> and{" "}
                    <span className="text-blue-600 underline cursor-pointer">privacy policy</span>
                  </p>
                </form>
              )}

              {/* Step 2: Security Questions */}
              {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What is your favorite meme?</label>
                    <Input
                      type="text"
                      value={formData.securityAnswer1}
                      onChange={(e) => handleInputChange("securityAnswer1", e.target.value)}
                      placeholder="Enter answer"
                      className={`w-full ${errors.securityAnswer1 ? "border-red-500" : ""}`}
                    />
                    {errors.securityAnswer1 && <p className="text-red-500 text-xs mt-1">{errors.securityAnswer1}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What is your favorite meme character?
                    </label>
                    <Input
                      type="text"
                      value={formData.securityAnswer2}
                      onChange={(e) => handleInputChange("securityAnswer2", e.target.value)}
                      placeholder="Enter answer"
                      className={`w-full ${errors.securityAnswer2 ? "border-red-500" : ""}`}
                    />
                    {errors.securityAnswer2 && <p className="text-red-500 text-xs mt-1">{errors.securityAnswer2}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What is your favorite meme website?
                    </label>
                    <Input
                      type="text"
                      value={formData.securityAnswer3}
                      onChange={(e) => handleInputChange("securityAnswer3", e.target.value)}
                      placeholder="Enter answer"
                      className={`w-full ${errors.securityAnswer3 ? "border-red-500" : ""}`}
                    />
                    {errors.securityAnswer3 && <p className="text-red-500 text-xs mt-1">{errors.securityAnswer3}</p>}
                  </div>

                  <div className="flex space-x-3">
                    <EnhancedButton type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                      Back
                    </EnhancedButton>
                    <EnhancedButton
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </EnhancedButton>
                  </div>
                </form>
              )}

              {/* Step 3: OTP Verification */}
              {step === 3 && (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value)
                        if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }))
                      }}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className={`w-full text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
                    />
                    {errors.otp && (
                      <p
                        className={`text-xs mt-1 ${errors.otp === "OTP resent successfully!" ? "text-green-500" : "text-red-500"}`}
                      >
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  <EnhancedButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </EnhancedButton>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isResending || isLoading}
                      className="text-sm text-blue-600 hover:text-blue-700 underline disabled:opacity-50"
                    >
                      {isResending ? "Resending..." : "Didn't receive the code? Resend OTP"}
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isLoading}
                      className="text-sm text-gray-600 hover:text-gray-700 underline disabled:opacity-50"
                    >
                      Back to Security Questions
                    </button>
                  </div>
                </form>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Created Successfully!</h3>
                    <p className="text-gray-600">Welcome to Feeda! You can now download our mobile app to get started.</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Download the MVP app:</p>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        onClick={() => handleDownloadApp("android")}
                        className="flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Android Icon */}
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.74-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                        </svg>
                        Android
                      </motion.button>

                      <motion.button
                        onClick={() => handleDownloadApp("ios")}
                        className="flex items-center justify-center p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* iOS Icon */}
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        iOS
                      </motion.button>
                    </div>
                  </div>

                  <EnhancedButton onClick={onClose} variant="outline" className="w-full">
                    Continue to Website
                  </EnhancedButton>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
