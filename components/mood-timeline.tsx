"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

type MoodEntry = {
  id: number
  date: string
  mood: number
  description: string
}

const MOOD_EMOJIS = ["", "😢", "😕", "😐", "🙂", "😄"]

export default function MoodTimeline() {
  const [entries, setEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
      setEntries(
        storedEntries.sort((a: MoodEntry, b: MoodEntry) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      )
    }

    loadEntries()

    // Listen for storage changes
    window.addEventListener("storage", loadEntries)

    return () => {
      window.removeEventListener("storage", loadEntries)
    }
  }, [])

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground py-8">No mood entries yet. Start tracking your mood!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Your Mood History</h2>

      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl">{MOOD_EMOJIS[entry.mood]}</div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
              </div>
            </div>

            {entry.description && <p className="text-sm mt-2 border-t pt-2">{entry.description}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

