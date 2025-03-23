"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const MOOD_EMOJIS = [
  { emoji: "😢", value: 1, label: "Sad" },
  { emoji: "😕", value: 2, label: "Unhappy" },
  { emoji: "😐", value: 3, label: "Neutral" },
  { emoji: "🙂", value: 4, label: "Good" },
  { emoji: "😄", value: 5, label: "Great" },
]

export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)
  const router = useRouter()

  // Validate form when mood selection changes
  useEffect(() => {
    if (touched) {
      validateForm()
    }
  }, [selectedMood, touched])

  const validateForm = () => {
    if (selectedMood === null) {
      setError("Please select a mood")
      return false
    }
    setError(null)
    return true
  }

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood)
    setTouched(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!validateForm()) {
      return
    }

    // Get existing entries or initialize empty array
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Add new entry
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      description: description.trim(),
    }

    // Save to localStorage
    localStorage.setItem("moodEntries", JSON.stringify([...existingEntries, newEntry]))

    // Reset form
    setSelectedMood(null)
    setDescription("")
    setTouched(false)

    toast({
      title: "Mood added",
      description: "Your mood was added successfully.",
    })

    // Refresh to show updated data
    router.refresh()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">How are you feeling now?</h2>
            <div className="flex justify-between mb-4">
              {MOOD_EMOJIS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`text-3xl p-2 rounded-full transition-all ${
                    selectedMood === mood.value ? "bg-primary/20 scale-125" : "hover:bg-muted"
                  }`}
                  title={mood.label}
                  aria-pressed={selectedMood === mood.value}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
            {error && touched && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Add notes (optional)
            </label>
            <Textarea
              id="description"
              placeholder="What's on your mind right now?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Mood
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

