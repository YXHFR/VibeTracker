import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Trophy, BookOpen, Dumbbell, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTestLeaderboardData } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default async function LeaderboardPage() {
  const leaderboardData = await getTestLeaderboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
              </div>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Track Your Progress
                </Button>
              </Link>
            </div>
            <Tabs defaultValue="overall" className="mt-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="exercise">Exercise</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
              </TabsList>
              <TabsContent value="overall" className="space-y-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>See how you compare with your friend</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {leaderboardData.users.map((user, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-medium">{user.totalPoints} points</span>
                          </div>
                          <Progress
                            value={user.totalProgress}
                            className="h-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-reading" />
                              <span>{user.readingHours}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Dumbbell className="h-4 w-4 text-exercise" />
                              <span>{user.exerciseHours}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Brain className="h-4 w-4 text-learning" />
                              <span>{user.learningHours}h</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
                    <CardTitle>Weekly Achievements</CardTitle>
                    <CardDescription>Milestones reached this week</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {leaderboardData.weeklyAchievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/5 to-amber-500/10"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{achievement.title}</h3>
                              <span className="text-xs text-muted-foreground">Achieved by {achievement.userName}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reading" className="space-y-6">
                <Card>
                  <CardHeader className="bg-reading/10">
                    <CardTitle>Reading Progress</CardTitle>
                    <CardDescription>Compare reading habits</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {leaderboardData.users.map((user, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {user.readingRank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-medium">{user.readingHours} hours</span>
                          </div>
                          <Progress
                            value={user.readingProgress}
                            className="h-3 bg-reading/20"
                            indicatorClassName="bg-reading"
                          />
                          <div className="text-sm text-muted-foreground">
                            <span>Goal: {user.readingGoal} hours</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="exercise" className="space-y-6">
                <Card>
                  <CardHeader className="bg-exercise/10">
                    <CardTitle>Exercise Progress</CardTitle>
                    <CardDescription>Compare exercise habits</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {leaderboardData.users.map((user, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {user.exerciseRank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-medium">{user.exerciseHours} hours</span>
                          </div>
                          <Progress
                            value={user.exerciseProgress}
                            className="h-3 bg-exercise/20"
                            indicatorClassName="bg-exercise"
                          />
                          <div className="text-sm text-muted-foreground">
                            <span>Goal: {user.exerciseGoal} hours</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="learning" className="space-y-6">
                <Card>
                  <CardHeader className="bg-learning/10">
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Compare learning habits</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {leaderboardData.users.map((user, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {user.learningRank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <span className="text-sm font-medium">{user.learningHours} hours</span>
                          </div>
                          <Progress
                            value={user.learningProgress}
                            className="h-3 bg-learning/20"
                            indicatorClassName="bg-learning"
                          />
                          <div className="text-sm text-muted-foreground">
                            <span>Goal: {user.learningGoal} hours</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

