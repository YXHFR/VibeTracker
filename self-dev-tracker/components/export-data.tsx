"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ExportData({ userData }: { userData: any }) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState("csv")

  const handleExport = () => {
    // In a real app, this would generate and download the file
    // For now, we'll just simulate it

    let content = ""
    let filename = ""

    if (format === "csv") {
      // Create CSV content
      content = "Title,Type,Duration,Date,Description\n"
      userData.recentActivities.forEach((activity: any) => {
        content += `"${activity.title}","${activity.type}",${activity.duration},"${activity.date}","${activity.description}"\n`
      })
      filename = "growth-tracker-activities.csv"
    } else if (format === "json") {
      // Create JSON content
      content = JSON.stringify(
        {
          user: {
            name: userData.name,
            email: userData.email,
          },
          activities: userData.recentActivities,
          stats: {
            readingHours: userData.readingHours,
            exerciseHours: userData.exerciseHours,
            learningHours: userData.learningHours,
            totalActivities: userData.totalActivities,
          },
        },
        null,
        2,
      )
      filename = "growth-tracker-data.json"
    }

    // Create a download link
    const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Your Data</DialogTitle>
          <DialogDescription>Download your activity data in your preferred format.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={format} onValueChange={setFormat}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv">CSV Format (Excel, Google Sheets)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json">JSON Format (Developer friendly)</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

