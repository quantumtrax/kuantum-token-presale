'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, X, Info, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

interface NotificationPopupProps {
  notifications: Notification[]
  removeNotification: (id: string) => void
}

export default function NotificationPopup({ notifications, removeNotification }: NotificationPopupProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-green-900/80 to-green-800/80',
          border: 'border-green-500/50',
          glow: 'shadow-green-500/20'
        }
      case 'error':
        return {
          bg: 'from-red-900/80 to-red-800/80',
          border: 'border-red-500/50',
          glow: 'shadow-red-500/20'
        }
      case 'warning':
        return {
          bg: 'from-orange-900/80 to-orange-800/80',
          border: 'border-orange-500/50',
          glow: 'shadow-orange-500/20'
        }
      case 'info':
        return {
          bg: 'from-blue-900/80 to-blue-800/80',
          border: 'border-blue-500/50',
          glow: 'shadow-blue-500/20'
        }
      default:
        return {
          bg: 'from-gray-900/80 to-gray-800/80',
          border: 'border-gray-500/50',
          glow: 'shadow-gray-500/20'
        }
    }
  }

  return (
    <div className="fixed top-20 right-4 z-[100] pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification, index) => {
          const colors = getColors(notification.type)
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                y: index * 10
              }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3
              }}
              className={`relative bg-gradient-to-r ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-xl p-4 mb-3 shadow-2xl ${colors.glow} pointer-events-auto max-w-sm`}
              style={{ 
                marginTop: index * 70,
                zIndex: 100 - index
              }}
            >
              {/* Background glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${colors.bg} rounded-xl blur opacity-20`}></div>
              
              <div className="relative flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    <span className="relative z-10 inline-block" style={{padding: '4px 8px'}}>
                      {notification.title}
                    </span>
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="relative z-10 inline-block" style={{padding: '4px 8px'}}>
                      {notification.message}
                    </span>
                  </p>
                </div>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeNotification(notification.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Progress bar for timed notifications */}
              {notification.duration && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/20 to-white/40 rounded-b-xl"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ 
                    duration: notification.duration / 1000,
                    ease: "linear"
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Auto-remove notifications after duration
export function useNotificationAutoRemove(
  notifications: Notification[], 
  removeNotification: (id: string) => void
) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          removeNotification(notification.id)
        }, notification.duration)
        
        return () => clearTimeout(timer)
      }
    })
  }, [notifications, removeNotification])
}