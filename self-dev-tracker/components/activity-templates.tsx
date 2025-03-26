"use client"

import { useState } from "react"
import { BookOpen, Brain, Dumbbell, Plus } from "lucide-react"

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
import { addActivity } from "@/app/actions"

// Template activities for quick adding
const templates = [
  {
    title: "Morning Reading",
    type: "reading",
    duration: 30,
    description: "Reading session in the morning",
    icon: BookOpen,
    color: "text-reading",
    bgColor: "bg-reading/10",
  },
  {
    title: "Workout Session",
    type: "exercise",
    duration: 45,
    description: "Regular workout routine",
    icon: Dumbbell,
    color: "text-exercise",
    bgColor: "bg-exercise/10",
  },
  {
    title: "Learning Session",
    type: "learning",
    duration: 60,
    description: "Learning new skills or topics",
    icon: Brain,
    color: "text-learning",
    bgColor: "bg-learning/10",
  },
]

export function ActivityTemplates() {
  const [open, setOpen] = useState(false)

  const handleAddTemplate = async (template: (typeof templates)[0]) => {
    const formData = new FormData()
    formData.append("title", template.title)
    formData.append("type", template.type)
    formData.append("duration", template.duration.toString())
    formData.append("description", template.description)

    await addActivity(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Activity Templates</DialogTitle>
          <DialogDescription>Choose a template to quickly add an activity.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {templates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center justify-start gap-3 h-auto p-3"
              onClick={() => handleAddTemplate(template)}
            >
              <div className={`rounded-full p-2 ${template.bgColor}`}>
                <template.icon className={`h-5 w-5 ${template.color}`} />
              </div>
              <div className="text-left">
                <div className="font-medium">{template.title}</div>
                <div className="text-xs text-muted-foreground">{template.duration} minutes</div>
              </div>
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

