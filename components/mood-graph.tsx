"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, startOfDay } from "date-fns"

type MoodEntry = {
  id: number
  date: string
  mood: number
  description: string
}

type TimeRange = "7days" | "30days" | "90days" | "all"
type AggregationType = "day" | "week" | "month"

export default function MoodGraph() {
  const [chartData, setChartData] = useState<any[]>([])
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Sort by date ascending
    const sortedEntries = storedEntries.sort(
      (a: MoodEntry, b: MoodEntry) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    setAllEntries(sortedEntries)
  }, [])

  useEffect(() => {
    if (allEntries.length === 0) return

    // Aggregate data by day to keep chart readable
    const aggregatedData = aggregateData(allEntries, "day")

    setChartData(aggregatedData)
  }, [allEntries])

  const aggregateData = (entries: MoodEntry[], aggregation: AggregationType = "day") => {
    if (entries.length === 0) return []

    const aggregatedMap = new Map()

    entries.forEach((entry) => {
      const date = new Date(entry.date)
      const key = startOfDay(date).getTime()

      if (!aggregatedMap.has(key)) {
        aggregatedMap.set(key, {
          date: new Date(key),
          moodSum: 0,
          count: 0,
          entries: [],
        })
      }

      const group = aggregatedMap.get(key)
      group.moodSum += entry.mood
      group.count += 1
      group.entries.push(entry)
    })

    // Convert map to array and calculate averages
    const result = Array.from(aggregatedMap.values()).map((group) => {
      const avgMood = group.moodSum / group.count

      return {
        date: format(group.date, "MMM d"),
        mood: Number.parseFloat(avgMood.toFixed(2)),
        tooltipDate: format(group.date, "PPP"),
        count: group.count,
        entries: group.entries,
      }
    })

    // Limit to max 20 data points to keep chart readable
    if (result.length > 20) {
      const step = Math.ceil(result.length / 20)
      return result.filter((_, index) => index % step === 0)
    }

    return result
  }

  if (allEntries.length === 0) {
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
      <CardHeader className="pb-2">
        <CardTitle>Mood Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">Showing daily mood averages</div>

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
                        <p className="text-sm">Average Mood: {data.mood.toFixed(1)}/5</p>
                        <p className="text-xs text-muted-foreground">
                          Based on {data.count} {data.count === 1 ? "entry" : "entries"}
                        </p>
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

