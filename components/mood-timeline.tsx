"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow, format, isFuture, isBefore, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Undo, CalendarIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCustomToast } from "@/components/ui/toast-provider"

type MoodEntry = {
  id: number
  date: string
  mood: number
  description: string
}

const MOOD_EMOJIS = ["", "😢", "😕", "😐", "🙂", "😄"]

export default function MoodTimeline() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null)
  const [editDate, setEditDate] = useState<Date | undefined>(undefined)
  const [editMood, setEditMood] = useState<number>(0)
  const [editDescription, setEditDescription] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null)
  const [lastDeletedEntry, setLastDeletedEntry] = useState<MoodEntry | null>(null)
  const { showToast, clearToasts } = useCustomToast()

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

  const handleEdit = (entry: MoodEntry) => {
    // Make sure calendar is closed when opening edit dialog
    setIsCalendarOpen(false)

    // Set the editing entry and its values
    setEditingEntry(entry)
    setEditDate(new Date(entry.date))
    setEditMood(entry.mood)
    setEditDescription(entry.description)
  }

  const handleDelete = (id: number) => {
    setEntryToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (entryToDelete === null) return

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Find the entry to delete (for undo functionality)
    const entryToDeleteObj = existingEntries.find((entry: MoodEntry) => entry.id === entryToDelete)

    // Store the deleted entry in localStorage for more reliable retrieval
    if (entryToDeleteObj) {
      localStorage.setItem("lastDeletedEntry", JSON.stringify(entryToDeleteObj))
      setLastDeletedEntry(entryToDeleteObj)
    }

    // Filter out the entry to delete
    const updatedEntries = existingEntries.filter((entry: MoodEntry) => entry.id !== entryToDelete)

    // Save to localStorage
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))

    // Update local state
    setEntries(
      updatedEntries.sort((a: MoodEntry, b: MoodEntry) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    )

    // Show success toast with undo button
    showToast({
      title: "Entry deleted",
      description: (
        <div className="flex items-center justify-between w-full">
          <span>Your mood entry has been deleted.</span>
          <Button
            variant="secondary"
            size="sm"
            className="ml-2 h-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={(e) => {
              e.stopPropagation()
              undoDelete()
            }}
          >
            <Undo className="h-3 w-3 mr-2" />
            Undo
          </Button>
        </div>
      ),
      duration: 8000, // Longer duration to give time to click undo
      id: "delete-toast", // Add an ID to identify this toast
    })

    // Trigger a storage event for other components to update
    window.dispatchEvent(new Event("storage"))

    // Close the dialog
    setDeleteConfirmOpen(false)
    setEntryToDelete(null)
  }

  const undoDelete = () => {
    // Clear the delete toast immediately
    clearToasts("delete-toast")

    // Try to get the deleted entry from state first, then from localStorage as fallback
    let deletedEntry = lastDeletedEntry

    if (!deletedEntry) {
      const storedDeletedEntry = localStorage.getItem("lastDeletedEntry")
      if (storedDeletedEntry) {
        try {
          deletedEntry = JSON.parse(storedDeletedEntry)
        } catch (e) {
          console.error("Failed to parse deleted entry", e)
          return
        }
      } else {
        console.error("No deleted entry found")
        return
      }
    }

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Add back the deleted entry
    const updatedEntries = [...existingEntries, deletedEntry]

    // Save to localStorage
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))

    // Clear the stored deleted entry
    localStorage.removeItem("lastDeletedEntry")

    // Update local state
    setEntries(
      updatedEntries.sort((a: MoodEntry, b: MoodEntry) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    )
    setLastDeletedEntry(null)

    // Show success toast
    showToast({
      title: "Entry restored",
      description: "Your mood entry has been restored.",
    })

    // Trigger a storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  }

  const saveEditedEntry = () => {
    if (!editingEntry || !editDate) return

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")

    // Find and update the entry
    const updatedEntries = existingEntries.map((entry: MoodEntry) => {
      if (entry.id === editingEntry.id) {
        return {
          ...entry,
          date: editDate.toISOString(),
          mood: editMood,
          description: editDescription.trim(),
        }
      }
      return entry
    })

    // Save to localStorage
    localStorage.setItem("moodEntries", JSON.stringify(updatedEntries))

    // Update local state
    setEntries(
      updatedEntries.sort((a: MoodEntry, b: MoodEntry) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    )

    // Show success toast
    showToast({
      title: "Entry updated",
      description: "Your mood entry has been updated.",
    })

    // Trigger a storage event for other components to update
    window.dispatchEvent(new Event("storage"))

    // Close the dialog and reset state
    setEditingEntry(null)
    setIsCalendarOpen(false)
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

  // Handle dialog close
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingEntry(null)
      setIsCalendarOpen(false)
    }
  }

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
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{MOOD_EMOJIS[entry.mood]}</div>
                <div className="text-sm">{format(new Date(entry.date), "MMM d, yyyy")}</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-xs text-muted-foreground mr-2">
                  {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(entry)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDelete(entry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>

            {entry.description && <p className="text-sm mt-3 text-muted-foreground">{entry.description}</p>}
          </CardContent>
        </Card>
      ))}

      {/* Edit Dialog */}
      <Dialog open={editingEntry !== null} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px] max-w-[95vw] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Mood Entry</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date (last 15 days)</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !editDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editDate ? format(editDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editDate}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setEditDate(newDate)
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
              <label className="block text-sm font-medium mb-2">Mood</label>
              <div className="flex justify-between mb-4">
                {MOOD_EMOJIS.filter((_, i) => i > 0).map((emoji, index) => {
                  const moodValue = index + 1
                  return (
                    <button
                      key={moodValue}
                      type="button"
                      onClick={() => setEditMood(moodValue)}
                      className={`text-3xl p-2 rounded-full transition-all ${
                        editMood === moodValue ? "bg-primary/20 scale-125" : "hover:bg-muted"
                      }`}
                      aria-pressed={editMood === moodValue}
                    >
                      {emoji}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium mb-2">
                Notes (optional)
              </label>
              <Textarea
                id="edit-description"
                placeholder="What's on your mind?"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={saveEditedEntry} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-[320px] p-4 sm:p-5">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-base">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">This will delete this mood entry.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 mt-2">
            <AlertDialogCancel onClick={() => setEntryToDelete(null)} className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

