"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

type ToastType = {
  title: string
  description?: string | ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

type ToastContextType = {
  showToast: (toast: ToastType) => void
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
      setToasts((prev) => prev.slice(1))
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
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

