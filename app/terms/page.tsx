"use client"

import { motion } from "framer-motion"
import { ArrowLeft, FileText, Users, Shield, AlertTriangle, Scale, Gavel } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedButton } from "@/components/enhanced-button"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function TermsOfService() {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Accounts",
      content: [
        "You must be at least 13 years old to create an account",
        "Provide accurate and complete information during registration",
        "Keep your account credentials secure and confidential",
        "You are responsible for all activities under your account",
        "One person may not maintain multiple accounts",
      ],
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Guidelines",
      content: [
        "You own the content you post, but grant us license to use it",
        "Content must not violate laws or infringe on others' rights",
        "No harassment, hate speech, or discriminatory content",
        "Respect intellectual property and copyright laws",
        "We may remove content that violates our community standards",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Platform Usage",
      content: [
        "Use Feeda for lawful purposes only",
        "Do not attempt to hack, disrupt, or compromise our systems",
        "Respect other users' privacy and personal information",
        "No spam, automated posting, or commercial solicitation",
        "Follow all applicable local, state, and federal laws",
      ],
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Creating fake accounts or impersonating others",
        "Sharing malicious software or harmful links",
        "Engaging in illegal activities or promoting violence",
        "Collecting user data without proper authorization",
        "Circumventing our security measures or access controls",
      ],
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Liability & Disclaimers",
      content: [
        "Feeda is provided 'as is' without warranties of any kind",
        "We are not liable for user-generated content or interactions",
        "Service availability is not guaranteed at all times",
        "Users assume risks associated with online social networking",
        "Our liability is limited to the maximum extent permitted by law",
      ],
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Enforcement & Termination",
      content: [
        "We may suspend or terminate accounts for violations",
        "Users may delete their accounts at any time",
        "Certain provisions survive account termination",
        "Disputes are resolved through binding arbitration",
        "These terms are governed by applicable jurisdiction laws",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-black rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-black bg-clip-text text-transparent">
                  Feeda
                </span>
              </motion.div>
            </Link>
            <Link href="/">
              <EnhancedButton variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl mb-6 shadow-lg"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully. By using Feeda, you agree to be bound by these conditions.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Feeda</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of Feeda, our social media platform designed for the
                future of online connection and content sharing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Feeda, you agree to be bound by these Terms. If you disagree with any part of
                these terms, then you may not access the service.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <motion.div className="grid gap-8 mb-12" variants={staggerContainer} initial="initial" animate="animate">
          {sections.map((section, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {section.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            className="flex items-start space-x-3 text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Important Notice */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These terms may be updated from time to time. We will notify users of significant changes via email
                    or platform notifications. Continued use of Feeda after changes constitutes acceptance of the new
                    terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-purple-900 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-gray-200 mb-6 leading-relaxed">
                If you have any questions about these Terms of Service or need clarification on any point, please don't
                hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <EnhancedButton className="bg-white text-purple-900 hover:bg-gray-100">
                    Contact Legal Team
                  </EnhancedButton>
                </Link>
                <EnhancedButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  Download Terms (PDF)
                </EnhancedButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
