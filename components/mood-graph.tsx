"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

type MoodEntry = {
  id: number
  date: string
  mood: number
  description: string
}

export default function MoodGraph() {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Sort by date ascending
    const sortedEntries = storedEntries.sort(
      (a: MoodEntry, b: MoodEntry) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // Format data for chart
    const formattedData = sortedEntries.map((entry: MoodEntry) => ({
      date: format(new Date(entry.date), "MMM d"),
      mood: entry.mood,
      tooltipDate: format(new Date(entry.date), "PPP"),
      description: entry.description,
    }))

    setChartData(formattedData)
  }, [])

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground py-8">
            No mood data to display yet. Start tracking your mood!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            mood: {
              label: "Mood Level",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} interval="preserveStartEnd" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} tickMargin={10} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded p-2 shadow-md">
                        <p className="font-medium">{data.tooltipDate}</p>
                        <p className="text-sm">
                          Mood: {["😢", "😕", "😐", "🙂", "😄"][data.mood - 1]} ({data.mood}/5)
                        </p>
                        {data.description && <p className="text-xs mt-1">{data.description}</p>}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--color-mood)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

