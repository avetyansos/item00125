```ts file=".next/types/app/layout.ts"
// File: /Users/sosavetyan/Downloads/Atlas Items/item00125/app/layout.tsx
import * as entry from '../../../app/layout.js'
import type { ResolvingMetadata, ResolvingViewport } from 'next/dist/lib/metadata/types/metadata-interface.js'

type TEntry = typeof import('../../../app/layout.js')

type SegmentParams<T extends Object = any> = T extends Record<string, any>
  ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
  : T

// Check that the entry is a valid entry
checkFields<Diff<{
  default: Function
  config?: {}
  generateStaticParams?: Function
  revalidate?: RevalidateRange<TEntry> | false
  dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static'
  dynamicParams?: boolean
  fetchCache?: 'auto' | 'force-no-store' | 'only-no-store' | 'default-no-store' | 'default-cache' | 'only-cache' | 'force-cache'
  preferredRegion?: 'auto' | 'global' | 'home' | string | string[]
  runtime?: 'nodejs' | 'experimental-edge' | 'edge'
  maxDuration?: number
  
  metadata?: any
  generateMetadata?: Function
  viewport?: any
  generateViewport?: Function
  experimental_ppr?: boolean
  
}, TEntry, ''>>()


// Check the prop type of the entry function
checkFields<Diff<LayoutProps, FirstArg<TEntry['default']>, 'default'>>()

// Check the arguments and return type of the generateMetadata function
if ('generateMetadata' in entry) {
  checkFields<Diff<LayoutProps, FirstArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>()
  checkFields<Diff<ResolvingMetadata, SecondArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>()
}

// Check the arguments and return type of the generateViewport function
if ('generateViewport' in entry) {
  checkFields<Diff<LayoutProps, FirstArg<MaybeField<TEntry, 'generateViewport'>>, 'generateViewport'>>()
  checkFields<Diff<ResolvingViewport, SecondArg<MaybeField<TEntry, 'generateViewport'>>, 'generateViewport'>>()
}

// Check the arguments and return type of the generateStaticParams function
if ('generateStaticParams' in entry) {
  checkFields<Diff<{ params: SegmentParams }, FirstArg<MaybeField<TEntry, 'generateStaticParams'>>, 'generateStaticParams'>>()
  checkFields<Diff<{ __tag__: 'generateStaticParams', __return_type__: any[] | Promise<any[]> }, { __tag__: 'generateStaticParams', __return_type__: ReturnType<MaybeField<TEntry, 'generateStaticParams'>> }>>()
}

export interface PageProps {
  params?: Promise<SegmentParams>
  searchParams?: Promise<any>
}
export interface LayoutProps {
  children?: React.ReactNode

  params?: Promise<SegmentParams>
}

// =============
// Utility types
type RevalidateRange<T> = T extends { revalidate: any } ? NonNegative<T['revalidate']> : never

// If T is unknown or any, it will be an empty {} type. Otherwise, it will be the same as Omit<T, keyof Base>.
type OmitWithTag<T, K extends keyof any, _M> = Omit<T, K>
type Diff<Base, T extends Base, Message extends string = ''> = 0 extends (1 & T) ? {} : OmitWithTag<T, keyof Base, Message>

type FirstArg<T extends Function> = T extends (...args: [infer T, any]) => any ? unknown extends T ? any : T : never
type SecondArg<T extends Function> = T extends (...args: [any, infer T]) => any ? unknown extends T ? any : T : never
type MaybeField<T, K extends string> = T extends { [k in K]: infer G } ? G extends Function ? G : never : never



function checkFields<_ extends { [k in keyof any]: never }>() {}

// https://github.com/sindresorhus/type-fest
type Numeric = number | bigint
type Zero = 0 | 0n
type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never
type NonNegative<T extends Numeric> = T extends Zero ? T : Negative<T> extends never ? T : '__invalid_negative_number__'

```

```ts file=".next/types/app/page.ts"
// File: /Users/sosavetyan/Downloads/Atlas Items/item00125/app/page.tsx
import * as entry from '../../../app/page.js'
import type { ResolvingMetadata, ResolvingViewport } from 'next/dist/lib/metadata/types/metadata-interface.js'

type TEntry = typeof import('../../../app/page.js')

type SegmentParams<T extends Object = any> = T extends Record<string, any>
  ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
  : T

// Check that the entry is a valid entry
checkFields<Diff<{
  default: Function
  config?: {}
  generateStaticParams?: Function
  revalidate?: RevalidateRange<TEntry> | false
  dynamic?: 'auto' | 'force-dynamic' | 'error' | 'force-static'
  dynamicParams?: boolean
  fetchCache?: 'auto' | 'force-no-store' | 'only-no-store' | 'default-no-store' | 'default-cache' | 'only-cache' | 'force-cache'
  preferredRegion?: 'auto' | 'global' | 'home' | string | string[]
  runtime?: 'nodejs' | 'experimental-edge' | 'edge'
  maxDuration?: number
  
  metadata?: any
  generateMetadata?: Function
  viewport?: any
  generateViewport?: Function
  experimental_ppr?: boolean
  
}, TEntry, ''>>()


// Check the prop type of the entry function
checkFields<Diff<PageProps, FirstArg<TEntry['default']>, 'default'>>()

// Check the arguments and return type of the generateMetadata function
if ('generateMetadata' in entry) {
  checkFields<Diff<PageProps, FirstArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>()
  checkFields<Diff<ResolvingMetadata, SecondArg<MaybeField<TEntry, 'generateMetadata'>>, 'generateMetadata'>>()
}

// Check the arguments and return type of the generateViewport function
if ('generateViewport' in entry) {
  checkFields<Diff<PageProps, FirstArg<MaybeField<TEntry, 'generateViewport'>>, 'generateViewport'>>()
  checkFields<Diff<ResolvingViewport, SecondArg<MaybeField<TEntry, 'generateViewport'>>, 'generateViewport'>>()
}

// Check the arguments and return type of the generateStaticParams function
if ('generateStaticParams' in entry) {
  checkFields<Diff<{ params: SegmentParams }, FirstArg<MaybeField<TEntry, 'generateStaticParams'>>, 'generateStaticParams'>>()
  checkFields<Diff<{ __tag__: 'generateStaticParams', __return_type__: any[] | Promise<any[]> }, { __tag__: 'generateStaticParams', __return_type__: ReturnType<MaybeField<TEntry, 'generateStaticParams'>> }>>()
}

export interface PageProps {
  params?: Promise<SegmentParams>
  searchParams?: Promise<any>
}
export interface LayoutProps {
  children?: React.ReactNode

  params?: Promise<SegmentParams>
}

// =============
// Utility types
type RevalidateRange<T> = T extends { revalidate: any } ? NonNegative<T['revalidate']> : never

// If T is unknown or any, it will be an empty {} type. Otherwise, it will be the same as Omit<T, keyof Base>.
type OmitWithTag<T, K extends keyof any, _M> = Omit<T, K>
type Diff<Base, T extends Base, Message extends string = ''> = 0 extends (1 & T) ? {} : OmitWithTag<T, keyof Base, Message>

type FirstArg<T extends Function> = T extends (...args: [infer T, any]) => any ? unknown extends T ? any : T : never
type SecondArg<T extends Function> = T extends (...args: [any, infer T]) => any ? unknown extends T ? any : T : never
type MaybeField<T, K extends string> = T extends { [k in K]: infer G } ? G extends Function ? G : never : never



function checkFields<_ extends { [k in keyof any]: never }>() {}

// https://github.com/sindresorhus/type-fest
type Numeric = number | bigint
type Zero = 0 | 0n
type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never
type NonNegative<T extends Numeric> = T extends Zero ? T : Negative<T> extends never ? T : '__invalid_negative_number__'

```

```ts file=".next/types/cache-life.d.ts"
// Type definitions for Next.js cacheLife configs

declare module 'next/cache' {
  export { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache'
  export {
    revalidateTag,
    revalidatePath,
    unstable_expireTag,
    unstable_expirePath,
  } from 'next/dist/server/web/spec-extension/revalidate'
  export { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store'

  
    /**
     * Cache this `"use cache"` for a timespan defined by the `"default"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 900 seconds (15 minutes)
     *   expire:     never
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 15 minutes, start revalidating new values in the background.
     * It lives for the maximum age of the server cache. If this entry has no traffic for a while, it may serve an old value the next request.
     */
    export function unstable_cacheLife(profile: "default"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"seconds"` profile.
     * ```
     *   stale:      0 seconds
     *   revalidate: 1 seconds
     *   expire:     60 seconds (1 minute)
     * ```
     * 
     * This cache may be stale on clients for 0 seconds before checking with the server.
     * If the server receives a new request after 1 seconds, start revalidating new values in the background.
     * If this entry has no traffic for 1 minute it will expire. The next request will recompute it.
     */
    export function unstable_cacheLife(profile: "seconds"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"minutes"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 60 seconds (1 minute)
     *   expire:     3600 seconds (1 hour)
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 1 minute, start revalidating new values in the background.
     * If this entry has no traffic for 1 hour it will expire. The next request will recompute it.
     */
    export function unstable_cacheLife(profile: "minutes"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"hours"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 3600 seconds (1 hour)
     *   expire:     86400 seconds (1 day)
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 1 hour, start revalidating new values in the background.
     * If this entry has no traffic for 1 day it will expire. The next request will recompute it.
     */
    export function unstable_cacheLife(profile: "hours"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"days"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 86400 seconds (1 day)
     *   expire:     604800 seconds (1 week)
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 1 day, start revalidating new values in the background.
     * If this entry has no traffic for 1 week it will expire. The next request will recompute it.
     */
    export function unstable_cacheLife(profile: "days"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"weeks"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 604800 seconds (1 week)
     *   expire:     2592000 seconds (30 days)
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 1 week, start revalidating new values in the background.
     * If this entry has no traffic for 30 days it will expire. The next request will recompute it.
     */
    export function unstable_cacheLife(profile: "weeks"): void
    
    /**
     * Cache this `"use cache"` for a timespan defined by the `"max"` profile.
     * ```
     *   stale:      300 seconds (5 minutes)
     *   revalidate: 2592000 seconds (30 days)
     *   expire:     never
     * ```
     * 
     * This cache may be stale on clients for 5 minutes before checking with the server.
     * If the server receives a new request after 30 days, start revalidating new values in the background.
     * It lives for the maximum age of the server cache. If this entry has no traffic for a while, it may serve an old value the next request.
     */
    export function unstable_cacheLife(profile: "max"): void
    
    /**
     * Cache this `"use cache"` using a custom timespan.
     * ```
     *   stale: ... // seconds 
     *   revalidate: ... // seconds
     *   expire: ... // seconds
     * ```
     * 
     * This is similar to Cache-Control: max-age=`stale`,s-max-age=`revalidate`,stale-while-revalidate=`expire-revalidate`
     * 
     * If a value is left out, the lowest of other cacheLife() calls or the default, is used instead.
     */
    export function unstable_cacheLife(profile: {
      /**
       * This cache may be stale on clients for ... seconds before checking with the server.
       */
      stale?: number,
      /**
       * If the server receives a new request after ... seconds, start revalidating new values in the background.
       */
      revalidate?: number,
      /**
       * If this entry has no traffic for ... seconds it will expire. The next request will recompute it.
       */
      expire?: number
    }): void
  

  export { cacheTag as unstable_cacheTag } from 'next/dist/server/use-cache/cache-tag'
}

```

```tsx file="app/layout.tsx"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mood Tracker",
  description: "Track your daily mood and visualize your emotional journey",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
```

```tsx file="app/page.tsx"
import MoodForm from "@/components/mood-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MoodTimeline from "@/components/mood-timeline"
import MoodGraph from "@/components/mood-graph"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="container max-w-md mx-auto p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mood Tracker</h1>
        <ThemeToggle />
      </div>

      <Tabs defaultValue="entry" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="entry">Record</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="mt-0">
          <MoodForm />
        </TabsContent>

        <TabsContent value="timeline" className="mt-0">
          <MoodTimeline />
        </TabsContent>

        <TabsContent value="graph" className="mt-0">
          <MoodGraph />
        </TabsContent>
      </Tabs>
    </main>
  )
}


```

```tsx file="components/mood-form.tsx"
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useCustomToast } from "@/components/ui/toast-provider"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!validateForm()) {
      return
    }

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Add new entry
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      description: description.trim(),
    }

    // Save to localStorage
    const updatedEntries = [...existingEntries, newEntry]
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))

    // Reset form
    setSelectedMood(null)
    setDescription("")
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


```

```tsx file="components/mood-graph.tsx"
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, startOfDay, subDays } from "date-fns"

type MoodEntry = {
  id: number
  date: string
  mood: number
  description: string
}

type AggregationType = "day" | "week" | "month"

export default function MoodGraph() {
  const [chartData, setChartData] = useState<any[]>([])
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

      // Sort by date ascending
      const sortedEntries = storedEntries.sort(
        (a: MoodEntry, b: MoodEntry) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )

      setAllEntries(sortedEntries)
    }

    loadEntries()

    // Listen for storage changes
    window.addEventListener("storage", loadEntries)

    return () => {
      window.removeEventListener("storage", loadEntries)
    }
  }, [])

  useEffect(() => {
    if (allEntries.length === 0) return

    // Filter entries to only include the last 15 days
    const cutoffDate = subDays(new Date(), 15)
    const filteredEntries = allEntries.filter((entry) => new Date(entry.date) >= cutoffDate)

    // Aggregate data by day to keep chart readable
    const aggregatedData = aggregateData(filteredEntries, "day")

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
        <div className="text-sm text-muted-foreground mb-4">Showing daily mood averages for the last 15 days</div>

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


```

```tsx file="components/mood-timeline.tsx"
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


```

```tsx file="components/theme-provider.tsx"
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

```tsx file="components/theme-toggle.tsx"
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


```

```ts file="components/ui/use-toast.ts"
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

```tsx file="hooks/use-mobile.tsx"
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

```ts file="hooks/use-toast.ts"
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

```ts file="lib/utils.ts"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

```ts file="next-env.d.ts"
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

```ts file="tailwind.config.ts"
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

```

