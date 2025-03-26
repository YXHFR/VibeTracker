"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, Brain, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Client component that receives pre-fetched data
export function ProfileClient({ userData }: { userData: any }) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    readingGoal: userData.readingGoal,
    exerciseGoal: userData.exerciseGoal,
    learningGoal: userData.learningGoal,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: id.includes("Goal") ? Number(value) : value,
    }))
  }

  const savePersonalInfo = () => {
    // In a real app, this would save to a database
    alert("Personal information saved!")
  }

  const saveGoals = () => {
    // In a real app, this would save to a database
    alert("Goals updated!")
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
            onClick={savePersonalInfo}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle>Goals & Preferences</CardTitle>
          <CardDescription>Set your weekly goals</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="readingGoal" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-reading" />
                Reading Goal (hours/week)
              </Label>
              <Input
                id="readingGoal"
                type="number"
                value={formData.readingGoal}
                onChange={handleInputChange}
                min="0"
                step="0.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exerciseGoal" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-exercise" />
                Exercise Goal (hours/week)
              </Label>
              <Input
                id="exerciseGoal"
                type="number"
                value={formData.exerciseGoal}
                onChange={handleInputChange}
                min="0"
                step="0.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningGoal" className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-learning" />
                Learning Goal (hours/week)
              </Label>
              <Input
                id="learningGoal"
                type="number"
                value={formData.learningGoal}
                onChange={handleInputChange}
                min="0"
                step="0.5"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
            onClick={saveGoals}
          >
            Update Goals
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

