import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getTestUserData } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SettingsClient } from "@/app/settings/settings-client"

// Convert to a Server Component by removing "use client"
export default async function SettingsPage() {
  // Fetch data on the server
  const userData = await getTestUserData()

  // Pass the data to a client component
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
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              </div>
            </div>
            <SettingsClient userData={userData} />
          </div>
        </main>
      </div>
    </div>
  )
}

