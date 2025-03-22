"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        variant: "destructive",
      })
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

    toast({
      title: "Mood recorded successfully!",
    })

    // Refresh to show updated data
    router.refresh()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">How are you feeling today?</h2>
            <div className="flex justify-between mb-4">
              {MOOD_EMOJIS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`text-3xl p-2 rounded-full transition-all ${
                    selectedMood === mood.value ? "bg-primary/20 scale-125" : "hover:bg-muted"
                  }`}
                  title={mood.label}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Add notes (optional)
            </label>
            <Textarea
              id="description"
              placeholder="What's on your mind today?"
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

