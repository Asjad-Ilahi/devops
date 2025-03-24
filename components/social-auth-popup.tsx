"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialAuthPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SocialAuthPopup({ isOpen, onClose }: SocialAuthPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-lg shadow-lg p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Coming Soon</h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <p>This authentication method is not available yet.</p>
                <p className="text-muted-foreground">
                  We're working on implementing this feature. Please use email and password to sign in for now.
                </p>
                <div className="pt-2">
                  <Button onClick={onClose} className="w-full">
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

