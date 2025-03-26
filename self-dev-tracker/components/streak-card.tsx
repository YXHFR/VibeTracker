import { Calendar, Flame } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  weeklyProgress: number
}

export function StreakCard({ currentStreak, longestStreak, weeklyProgress }: StreakCardProps) {
  return (
    <Card className="border-t-4 border-t-orange-500 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-500/5">
        <CardTitle className="text-sm font-medium">Activity Streak</CardTitle>
        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
          <Flame className="h-4 w-4 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Current Streak</span>
          </div>
          <span className="text-2xl font-bold">{currentStreak} days</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Longest Streak</span>
          </div>
          <span className="text-sm text-muted-foreground">{longestStreak} days</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Weekly Goal Progress</span>
            <span className="text-xs font-medium">{weeklyProgress}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

