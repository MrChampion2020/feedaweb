"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FloatingDownloadButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = (platform: "android" | "ios") => {
    const link = document.createElement("a")
    if (platform === "android") {
      link.href = "/downloads/feeda-android.apk"
      link.download = "feeda-android.apk"
    } else {
      link.href = "/downloads/feeda-ios.ipa"
      link.download = "feeda-ios.ipa"
    }
    link.click()
    setIsOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Download Options Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 md:right-8 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg w-72">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Download Feeda</h3>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {/* Android Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload("android")}
                    className="flex items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-green-500 cursor-pointer transition-all duration-300 group bg-white hover:bg-green-50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      {/* Android Logo */}
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.74-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        Android
                      </h4>
                      <p className="text-sm text-gray-600">Compatible with Android 8.0+</p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </motion.div>

                  {/* iOS Option */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload("ios")}
                    className="flex items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-800 cursor-pointer transition-all duration-300 group bg-white hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      {/* Apple Logo */}
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">iOS</h4>
                      <p className="text-sm text-gray-600">Compatible with iOS 14.0+</p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-800 transition-colors" />
                  </motion.div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Beta version • For testing purposes only</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Download Button */}
      <motion.div
        className="fixed bottom-6 right-4 md:right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", damping: 25, stiffness: 300 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 10px 30px rgba(59, 130, 246, 0.3)",
              "0 20px 40px rgba(59, 130, 246, 0.4)",
              "0 10px 30px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            boxShadow: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Button content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="download"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 3 }}
            >
              Download App
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
