"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Client component that receives pre-fetched data
export function SettingsClient({ userData }: { userData: any }) {
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminder: true,
    weeklySummary: true,
    achievementAlerts: true,
  })
  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
  })

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleDisplayChange = (setting: keyof typeof displaySettings) => {
    setDisplaySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const saveNotificationSettings = () => {
    // In a real app, this would save to a database
    alert("Notification settings saved!")
  }

  const saveDisplaySettings = () => {
    // In a real app, this would save to a database
    alert("Display settings saved!")
  }

  return (
    <div className="mt-6 grid gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-reminder">Daily Reminder</Label>
                <p className="text-sm text-muted-foreground">Receive a daily reminder to log your activities</p>
              </div>
              <Switch
                id="daily-reminder"
                checked={notificationSettings.dailyReminder}
                onCheckedChange={() => handleNotificationChange("dailyReminder")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-summary">Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of your progress</p>
              </div>
              <Switch
                id="weekly-summary"
                checked={notificationSettings.weeklySummary}
                onCheckedChange={() => handleNotificationChange("weeklySummary")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when you earn a new achievement</p>
              </div>
              <Switch
                id="achievement-alerts"
                checked={notificationSettings.achievementAlerts}
                onCheckedChange={() => handleNotificationChange("achievementAlerts")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
            onClick={saveNotificationSettings}
          >
            Save Notification Settings
          </Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <Switch
                id="dark-mode"
                checked={displaySettings.darkMode}
                onCheckedChange={() => handleDisplayChange("darkMode")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more content with less spacing</p>
              </div>
              <Switch
                id="compact-view"
                checked={displaySettings.compactView}
                onCheckedChange={() => handleDisplayChange("compactView")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-medium"
            onClick={saveDisplaySettings}
          >
            Save Display Settings
          </Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">••••••••••••</p>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button variant="destructive">Log Out</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

