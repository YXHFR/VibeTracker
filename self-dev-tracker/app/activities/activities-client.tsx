"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Brain, Dumbbell, Sparkles, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivitySearch } from "@/components/activity-search"
import { ActivityTemplates } from "@/components/activity-templates"

// Client component that receives pre-fetched data
export function ActivitiesClient({ userData }: { userData: any }) {
  const [filteredActivities, setFilteredActivities] = useState<any[]>(userData.recentActivities)

  // Handle search functionality
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredActivities(userData.recentActivities)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = userData.recentActivities.filter(
      (activity: any) =>
        activity.title.toLowerCase().includes(lowercaseQuery) ||
        activity.description.toLowerCase().includes(lowercaseQuery) ||
        activity.type.toLowerCase().includes(lowercaseQuery),
    )

    setFilteredActivities(filtered)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <ActivitySearch onSearch={handleSearch} />
          </div>
          <ActivityTemplates />
          <Button
            onClick={() => document.getElementById("add-activity-trigger")?.click()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
          >
            Track New Activity
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="hobby">Hobbies</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No activities found. Try a different search or add a new activity.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <Card
                  key={index}
                  className={`
                  ${activity.type === "reading" ? "border-l-4 border-l-reading" : ""}
                  ${activity.type === "exercise" ? "border-l-4 border-l-exercise" : ""}
                  ${activity.type === "learning" ? "border-l-4 border-l-learning" : ""}
                  ${activity.type === "mindfulness" ? "border-l-4 border-l-mindfulness" : ""}
                  ${activity.type === "hobby" ? "border-l-4 border-l-hobby" : ""}
                `}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>{activity.date}</CardDescription>
                    </div>
                    <div
                      className={`
                      h-10 w-10 rounded-full flex items-center justify-center
                      ${activity.type === "reading" ? "bg-reading/10" : ""}
                      ${activity.type === "exercise" ? "bg-exercise/10" : ""}
                      ${activity.type === "learning" ? "bg-learning/10" : ""}
                      ${activity.type === "mindfulness" ? "bg-mindfulness/10" : ""}
                      ${activity.type === "hobby" ? "bg-hobby/10" : ""}
                    `}
                    >
                      {activity.type === "reading" && <BookOpen className="h-5 w-5 text-reading" />}
                      {activity.type === "exercise" && <Dumbbell className="h-5 w-5 text-exercise" />}
                      {activity.type === "learning" && <Brain className="h-5 w-5 text-learning" />}
                      {activity.type === "mindfulness" && <Sparkles className="h-5 w-5 text-mindfulness" />}
                      {activity.type === "hobby" && <Trophy className="h-5 w-5 text-hobby" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{activity.description}</p>
                    <div className="mt-2 text-sm text-muted-foreground">Duration: {activity.duration} minutes</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        {["reading", "exercise", "learning", "mindfulness", "hobby"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4 mt-4">
            <div className="space-y-4">
              {filteredActivities
                .filter((activity) => activity.type === type)
                .map((activity, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 border-l-${
                      type === "mindfulness"
                        ? "mindfulness"
                        : type === "hobby"
                          ? "hobby"
                          : type === "reading"
                            ? "reading"
                            : type === "exercise"
                              ? "exercise"
                              : "learning"
                    }`}
                  >
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>{activity.title}</CardTitle>
                        <CardDescription>{activity.date}</CardDescription>
                      </div>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-${type}/10`}>
                        {type === "reading" && <BookOpen className={`h-5 w-5 text-${type}`} />}
                        {type === "exercise" && <Dumbbell className={`h-5 w-5 text-${type}`} />}
                        {type === "learning" && <Brain className={`h-5 w-5 text-${type}`} />}
                        {type === "mindfulness" && <Sparkles className={`h-5 w-5 text-${type}`} />}
                        {type === "hobby" && <Trophy className={`h-5 w-5 text-${type}`} />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{activity.description}</p>
                      <div className="mt-2 text-sm text-muted-foreground">Duration: {activity.duration} minutes</div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

