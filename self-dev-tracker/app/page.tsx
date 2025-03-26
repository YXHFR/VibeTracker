import Link from "next/link"
import { ArrowRight, BarChart2, BookOpen, Brain, Sparkles, Target } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span>GrowthTracker</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                Log in
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                Try Now
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 md:py-24 lg:py-32 text-white">
          <div className="container space-y-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                Track your growth journey
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl">
                Track your growth, <span className="text-yellow-300">together</span>
              </h1>
              <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                Monitor your self-development journey, compete with a friend, and stay motivated to achieve your goals.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90 font-bold">
                    Start Tracking Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need to grow
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Our platform provides all the tools you need to track your self-development journey and stay motivated.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-start gap-2 rounded-lg p-6 shadow-sm card-gradient-1">
                <BookOpen className="h-10 w-10 text-reading" />
                <h3 className="text-xl font-bold">Reading Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Log your daily reading habits and track your progress over time.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg p-6 shadow-sm card-gradient-2">
                <BarChart2 className="h-10 w-10 text-exercise" />
                <h3 className="text-xl font-bold">Progress Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  See your growth with beautiful charts and visualizations.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg p-6 shadow-sm card-gradient-3">
                <Brain className="h-10 w-10 text-learning" />
                <h3 className="text-xl font-bold">Skill Development</h3>
                <p className="text-sm text-muted-foreground">
                  Track your progress in learning new skills and abilities.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg p-6 shadow-sm card-gradient-4">
                <Target className="h-10 w-10 text-pink-500" />
                <h3 className="text-xl font-bold">Goal Setting</h3>
                <p className="text-sm text-muted-foreground">Set and achieve your personal development goals.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 md:py-24 lg:py-32 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to start your journey?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join now and start tracking your progress towards becoming your best self.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/dashboard">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold" size="lg">
                    Start Your Journey Today
                  </Button>
                </Link>
                <p className="text-xs text-white/80">No login required for testing. Start tracking your growth now!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>© 2025 GrowthTracker. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

