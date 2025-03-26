import { getTestUserData } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import AddActivityDialog from "@/app/dashboard/add-activity-dialog"
import { ActivitiesClient } from "@/app/activities/activities-client"

// Convert to a Server Component by removing "use client"
export default async function ActivitiesPage() {
  // Fetch data on the server
  const userData = await getTestUserData()

  // Pass the data to a client component
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <ActivitiesClient userData={userData} />
        </main>
      </div>
      <AddActivityDialog />
    </div>
  )
}

