import Link from "next/link"
import { BookOpen, BookText, LayoutDashboard, MessageCircle, Settings, Trophy, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-muted/40 lg:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
        </Link>
        <Link href="/activities">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-5 w-5" />
            Activities
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookText className="h-5 w-5" />
            Blog
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <MessageCircle className="h-5 w-5" />
            Community Chat
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User className="h-5 w-5" />
            Profile
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  )
}

