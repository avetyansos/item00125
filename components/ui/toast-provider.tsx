"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

type ToastType = {
  title: string
  description?: string | ReactNode
  variant?: "default" | "destructive"
  duration?: number
  id?: string
}

type ToastContextType = {
  showToast: (toast: ToastType) => void
  clearToasts: (id?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const showToast = (toast: ToastType) => {
    // Add toast to the queue
    setToasts((prev) => [...prev, toast])

    // Remove toast after specified duration or default to 5 seconds
    const duration = toast.duration || 5000
    setTimeout(() => {
      setToasts((prev) => {
        // Find the index of the toast to remove
        const index = prev.findIndex(
          (t) => t.id === toast.id || (t.title === toast.title && t.description === toast.description),
        )

        // If found, remove it
        if (index !== -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)]
        }

        // If not found or no ID specified, remove the oldest toast
        return prev.slice(1)
      })
    }, duration)
  }

  const clearToasts = (id?: string) => {
    if (id) {
      // Clear a specific toast by ID
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    } else {
      // Clear all toasts
      setToasts([])
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, clearToasts }}>
      {children}
      <Toaster />

      {/* Render active toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className={`rounded-md p-4 shadow-md transition-all duration-300 transform translate-y-0 
              ${toast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background border text-foreground"}`}
          >
            <div className="font-medium">{toast.title}</div>
            <div className="text-sm mt-1">{toast.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useCustomToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useCustomToast must be used within a ToastProvider")
  }
  return context
}

