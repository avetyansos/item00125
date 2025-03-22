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

