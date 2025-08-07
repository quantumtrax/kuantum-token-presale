'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import NotificationPopup, { Notification, useNotificationAutoRemove } from '@/components/NotificationPopup'

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000 // Default 5 seconds
    }
    
    setNotifications(prev => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // Auto-remove notifications
  useNotificationAutoRemove(notifications, removeNotification)

  const value = {
    showNotification,
    removeNotification,
    notifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationPopup 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </NotificationContext.Provider>
  )
}