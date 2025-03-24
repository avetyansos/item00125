"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { Toaster } from "@/components/ui/toaster"

type ToastType = {
  title: string
  description?: string
  variant?: "default" | "destructive"
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

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
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
              ${toast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.description && <div className="text-sm mt-1">{toast.description}</div>}
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

