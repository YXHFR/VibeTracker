"use client"

import Link from "next/link"
import { BookOpen, Brain, Dumbbell, Plus, Sparkles, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityTemplates } from "@/components/activity-templates"
import { ExportData } from "@/components/export-data"
import { StreakCard } from "@/components/streak-card"
import ActivityChart from "@/app/dashboard/activity-chart"

// Client component that receives pre-fetched data
export function DashboardClient({ userData }: { userData: any }) {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <ActivityTemplates />
          <ExportData userData={userData} />
          <Button
            onClick={() => document.getElementById("add-activity-trigger")?.click()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
          >
            <Plus className="mr-2 h-4 w-4" /> Track New Activity
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-t-4 border-t-primary overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{userData.totalActivities}</div>
                <p className="text-xs text-muted-foreground">+{userData.newActivities} from last week</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-reading overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-reading/5">
                <CardTitle className="text-sm font-medium">Reading</CardTitle>
                <div className="h-8 w-8 rounded-full bg-reading/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-reading" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{userData.readingHours} hours</div>
                <p className="text-xs text-muted-foreground">{userData.readingProgress}% of weekly goal</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-exercise overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-exercise/5">
                <CardTitle className="text-sm font-medium">Exercise</CardTitle>
                <div className="h-8 w-8 rounded-full bg-exercise/10 flex items-center justify-center">
                  <Dumbbell className="h-4 w-4 text-exercise" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{userData.exerciseHours} hours</div>
                <p className="text-xs text-muted-foreground">{userData.exerciseProgress}% of weekly goal</p>
              </CardContent>
            </Card>
            <StreakCard
              currentStreak={userData.streak?.current || 5}
              longestStreak={userData.streak?.longest || 12}
              weeklyProgress={userData.streak?.weeklyProgress || 75}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityChart data={userData.weeklyActivity} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>Your progress towards this week's goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-reading" />
                      <span className="text-sm font-medium">Reading</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {userData.readingHours}/{userData.readingGoal} hours
                    </span>
                  </div>
                  <Progress
                    value={userData.readingProgress}
                    className="h-2 bg-reading/20"
                    indicatorClassName="bg-reading"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-exercise" />
                      <span className="text-sm font-medium">Exercise</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {userData.exerciseHours}/{userData.exerciseGoal} hours
                    </span>
                  </div>
                  <Progress
                    value={userData.exerciseProgress}
                    className="h-2 bg-exercise/20"
                    indicatorClassName="bg-exercise"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-learning" />
                      <span className="text-sm font-medium">Learning</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {userData.learningHours}/{userData.learningGoal} hours
                    </span>
                  </div>
                  <Progress
                    value={userData.learningProgress}
                    className="h-2 bg-learning/20"
                    indicatorClassName="bg-learning"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Link href="/profile" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Adjust Goals
                  </Button>
                </Link>
                <Button
                  onClick={() => document.getElementById("add-activity-trigger")?.click()}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Add Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h2 className="text-2xl font-bold">Recent Activities</h2>
            <Button
              onClick={() => document.getElementById("add-activity-trigger")?.click()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Activity
            </Button>
          </div>
          <div className="space-y-4">
            {userData.recentActivities.map((activity: any, index: number) => (
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
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Progress</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Your activity over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart data={userData.monthlyActivity} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Milestones you've reached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.achievements.map((achievement: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

