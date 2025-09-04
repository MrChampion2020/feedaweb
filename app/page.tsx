"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Users,
  Zap,
  Shield,
  Download,
  ArrowRight,
  Star,
  Globe,
  MessageCircle,
} from "lucide-react";
import { EnhancedButton } from "@/components/enhanced-button";
import { FloatingElements } from "@/components/floating-elements";
import { FloatingDownloadButton } from "@/components/floating-download-button";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { SignupForm } from "@/components/signup-form";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function FeedaLanding() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, try to sign up the user on the Feeda server
      const signupResponse = await fetch(
        "https://feeda.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            username: email.split("@")[0], // Use email prefix as username
            fullName: "Feeda User", // Default full name
            password: "TempPassword123!", // Temporary password
            securityAnswers: {
              q1: "default",
              q2: "default",
              q3: "default",
            },
            deviceId: "web-landing-" + Date.now(),
          }),
        }
      );

      if (signupResponse.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        const errorData = await signupResponse.json();
        console.error("Signup error:", errorData);
        // Still show success to user for waitlist purposes
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
      // Still show success to user for waitlist purposes
      setIsSubmitted(true);
      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToWaitlist = () => {
    setShowSignupForm(true);
  };

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Smart Feed",
      description: "AI-powered content curation that learns your preferences",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect Instantly",
      description: "Find and connect with like-minded people effortlessly",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed with real-time updates",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data is encrypted and protected at all times",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connect with users worldwide in multiple languages",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Experience",
      description: "Ad-free, distraction-free social networking",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <FloatingElements />
      <FloatingDownloadButton />

      {/* Header */}
      <motion.header
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/icon.png"
              alt="Feeda Logo"
              width={40}
              height={40}
              className="rounded-xl shadow-lg"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#features"
              className="text-gray-600 hover:text-blue-900 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#download"
              className="text-gray-600 hover:text-blue-900 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
            >
              Download
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#waitlist"
              className="text-gray-600 hover:text-blue-900 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
            >
              Join Now
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <EnhancedButton
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Download APK directly
                  const link = document.createElement("a");
                  link.href = "/downloads/feeda-android.apk";
                  link.download = "feeda-android.apk";
                  link.click();
                }}
              >
                Get Started
              </EnhancedButton>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                className="w-6 h-0.5 bg-gray-600 block transition-all duration-300"
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-600 block mt-1 transition-all duration-300"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-600 block mt-1 transition-all duration-300"
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0 }
                }
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden bg-white border-t border-gray-100"
          initial={{ height: 0, opacity: 0 }}
          animate={
            isMobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-4 py-6 space-y-4">
            <motion.a
              href="#features"
              className="block text-gray-600 hover:text-blue-900 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ x: 10 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#download"
              className="block text-gray-600 hover:text-blue-900 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ x: 10 }}
            >
              Download
            </motion.a>
            <motion.a
              href="#waitlist"
              className="block text-gray-600 hover:text-blue-900 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ x: 10 }}
            >
              Join Now
            </motion.a>
            <motion.a
              href="#download"
              className="text-gray-600 hover:text-blue-900 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
            >
              Get Started
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.div
                className="inline-block mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Badge
                  variant="outline"
                  className="mb-4 border-blue-900 text-blue-900 px-4 py-2 text-sm font-semibold"
                >
                  🚀 MVP Close Test Ongoing
                </Badge>
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of
                <motion.span
                  className="block bg-gradient-to-r from-blue-900 via-blue-700 to-black bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  Social Media
                </motion.span>
              </h1>
              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Experience social media reimagined. Connect, share, and discover
                in a clean, privacy-focused environment designed for the next
                generation.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.a
                href="#download"
                 className=" flex flex-col sm:flex-row gap-4 border-2 border-gray-300 hover:border-blue-900 hover:bg-blue-50 px-6 py-1 rounded-full transition-all duration-300 hover:shadow-lg"

                whileHover={{ y: -2 }}
              >
                Join Now
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <EnhancedButton
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Watch Demo
                </EnhancedButton>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced App Preview with floating elements */}
          <motion.div
            className="relative max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Floating elements around the phone */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-black/30 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <Card className="relative bg-gradient-to-b from-gray-900 to-black border-0 rounded-3xl overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center relative">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>

                    {/* App preview content */}
                    <motion.div
                      className="text-center text-white z-10"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Smartphone className="w-20 h-20 mx-auto mb-6 opacity-60" />
                      </motion.div>
                      <motion.p
                        className="text-lg font-semibold mb-2"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        Feeda App
                      </motion.p>
                      <p className="text-sm opacity-75 mb-4">MVP Close Test</p>
                      <motion.div
                        className="flex justify-center space-x-2"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      </motion.div>
                    </motion.div>

                    {/* Animated background elements */}
                    <motion.div
                      className="absolute top-20 left-8 w-4 h-4 bg-blue-500/30 rounded-full"
                      animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-20 right-8 w-3 h-3 bg-purple-500/30 rounded-full"
                      animate={{
                        y: [0, 100, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Built for the
              <span className="block bg-gradient-to-r from-blue-900 via-purple-600 to-blue-900 bg-clip-text text-transparent">
                Future
              </span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Feeda combines cutting-edge technology with intuitive design to
              create the most advanced social media experience ever built.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm group-hover:bg-white">
                  <CardContent className="p-6 md:p-8">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background decoration */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-20 bg-gradient-to-b from-white to-gray-50 relative"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Get Early Access
            </motion.h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Download the beta version and be among the first to experience the
              future of social media
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="group">
              <Card className="border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                <CardContent className="p-6 md:p-8 text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Android Icon */}
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.74-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    Android
                  </h3>
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    Compatible with Android 8.0+
                  </p>
                  <EnhancedButton
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/downloads/feeda-android.apk";
                      link.download = "feeda-android.apk";
                      link.click();
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download APK
                  </EnhancedButton>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <Card className="border-2 border-gray-200 hover:border-gray-800 transition-all duration-500 hover:shadow-2xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                <CardContent className="p-6 md:p-8 text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* iOS Icon */}
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    iOS
                  </h3>
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    Compatible with iOS 14.0+
                  </p>
                  <EnhancedButton
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/downloads/feeda-ios.ipa";
                      link.download = "feeda-ios.ipa";
                      link.click();
                    }}
                    className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download IPA
                  </EnhancedButton>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500">
              Beta version • For testing purposes only • Requires developer mode
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signup Section */}
      <section
        id="waitlist"
        className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Join the Revolution
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Create your account and be among the first to experience the
              future of social media.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EnhancedButton
                onClick={() => setShowSignupForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 shadow-lg hover:shadow-2xl text-white flex-1"
              >
                Create Account
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 flex-1"
              >
                Learn More
              </EnhancedButton>
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-sm text-gray-400"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Join 1,000+ users already signed up
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Background effects */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Signup Form Modal */}
      <AnimatePresence>
        {showSignupForm && (
          <SignupForm onClose={() => setShowSignupForm(false)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image
                src="/icon.png"
                alt="Feeda Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
                priority
              />
            </div>
            <p className="text-gray-400 mb-6">
              The future of social media is here
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              © 2025 Feeda. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
