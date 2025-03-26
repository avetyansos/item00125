"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useCustomToast } from "@/components/ui/toast-provider"
import { useRouter } from "next/navigation"
import { AlertCircle, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, isFuture, isBefore, subDays } from "date-fns"
import { cn } from "@/lib/utils"

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
  const [date, setDate] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const router = useRouter()
  const { showToast } = useCustomToast()

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

  // Function to disable dates outside the allowed range (last 15 days to today)
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    const fifteenDaysAgo = subDays(today, 15)

    // Disable future dates
    if (isFuture(date)) return true

    // Disable dates more than 15 days in the past
    if (isBefore(date, fifteenDaysAgo)) return true

    return false
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!validateForm()) {
      return
    }

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Add new entry with selected date
    const newEntry = {
      id: Date.now(),
      date: date.toISOString(),
      mood: selectedMood,
      description: description.trim(),
    }

    // Save to localStorage
    const updatedEntries = [...existingEntries, newEntry]
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))

    // Reset form
    setSelectedMood(null)
    setDescription("")
    setDate(new Date())
    setTouched(false)

    // Show success toast using our custom toast provider
    showToast({
      title: "Mood added",
      description: "Your mood was added successfully.",
    })

    // Trigger a storage event for other components to update
    window.dispatchEvent(new Event("storage"))

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
            <label className="block text-sm font-medium mb-2">Date (last 15 days)</label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) {
                      setDate(newDate)
                      setIsCalendarOpen(false)
                    }
                  }}
                  disabled={isDateDisabled}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
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

