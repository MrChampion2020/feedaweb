"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
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

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Account information (email, username, profile details)",
        "Content you create (posts, comments, messages)",
        "Usage data (how you interact with our platform)",
        "Device information (IP address, browser type, operating system)",
        "Location data (only if you choose to share it)",
      ],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our social media services",
        "Personalize your feed and recommendations",
        "Communicate with you about updates and features",
        "Ensure platform security and prevent abuse",
        "Analyze usage patterns to enhance user experience",
      ],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Protection",
      content: [
        "End-to-end encryption for private messages",
        "Secure data storage with industry-standard protocols",
        "Regular security audits and vulnerability assessments",
        "Limited access to personal data by authorized personnel only",
        "Automatic data anonymization for analytics",
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Public posts are visible to other users as intended",
        "Anonymous usage statistics may be shared with partners",
        "Legal compliance may require data disclosure when mandated",
        "Service providers may access data to maintain our platform",
      ],
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access and download your personal data",
        "Correct or update your information",
        "Delete your account and associated data",
        "Control privacy settings and data sharing preferences",
        "Opt-out of non-essential communications",
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Users",
      content: [
        "Compliance with GDPR for European users",
        "CCPA compliance for California residents",
        "Data may be processed in multiple countries",
        "Local privacy laws are respected and followed",
        "Cross-border data transfers are secured and legal",
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl mb-6 shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect and handle your personal information.
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
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Feeda, we believe privacy is a fundamental right. This policy explains how we collect, use, and
                protect your information when you use our social media platform. We're committed to transparency and
                giving you control over your data.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <motion.div className="grid gap-8 mb-12" variants={staggerContainer} initial="initial" animate="animate">
          {sections.map((section, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {section.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
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
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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

        {/* Contact Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-blue-900 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-gray-200 mb-6 leading-relaxed">
                If you have any questions about this privacy policy or how we handle your data, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <EnhancedButton className="bg-white text-blue-900 hover:bg-gray-100">Contact Us</EnhancedButton>
                </Link>
                <EnhancedButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  Download Policy (PDF)
                </EnhancedButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
