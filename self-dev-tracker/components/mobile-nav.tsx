"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, BookText, LayoutDashboard, Menu, MessageCircle, Settings, Trophy, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
                <span className="text-primary">GrowthTracker</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/activities" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BookOpen className="h-5 w-5" />
                  Activities
                </Button>
              </Link>
              <Link href="/leaderboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Trophy className="h-5 w-5" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/blog" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BookText className="h-5 w-5" />
                  Blog
                </Button>
              </Link>
              <Link href="/chat" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Community Chat
                </Button>
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </Button>
              </Link>
              <Link href="/settings" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
          <div className="border-t p-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

