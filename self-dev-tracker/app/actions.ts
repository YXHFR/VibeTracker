"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock data for demonstration purposes
// In a real application, this would be replaced with database calls

// Mock user data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    totalActivities: 24,
    newActivities: 3,
    readingHours: 8,
    readingGoal: 10,
    readingProgress: 80,
    readingRank: 1,
    exerciseHours: 5,
    exerciseGoal: 7,
    exerciseProgress: 71,
    exerciseRank: 2,
    learningHours: 12,
    learningGoal: 15,
    learningProgress: 80,
    learningRank: 1,
    totalPoints: 850,
    totalProgress: 78,
    weeklyActivity: [
      { name: "Mon", reading: 1, exercise: 0.5, learning: 2 },
      { name: "Tue", reading: 1.5, exercise: 1, learning: 1.5 },
      { name: "Wed", reading: 1, exercise: 1, learning: 2 },
      { name: "Thu", reading: 2, exercise: 0.5, learning: 1.5 },
      { name: "Fri", reading: 1.5, exercise: 1, learning: 2 },
      { name: "Sat", reading: 0.5, exercise: 0.5, learning: 1.5 },
      { name: "Sun", reading: 0.5, exercise: 0.5, learning: 1.5 },
    ],
    monthlyActivity: [
      { name: "Week 1", reading: 6, exercise: 4, learning: 10 },
      { name: "Week 2", reading: 7, exercise: 5, learning: 11 },
      { name: "Week 3", reading: 8, exercise: 4.5, learning: 12 },
      { name: "Week 4", reading: 8, exercise: 5, learning: 12 },
    ],
    recentActivities: [
      {
        title: "Read 'Atomic Habits'",
        type: "reading",
        date: "Today, 10:30 AM",
        duration: 60,
        description: "Finished chapter 5 on building better habits.",
      },
      {
        title: "Morning Workout",
        type: "exercise",
        date: "Today, 7:00 AM",
        duration: 45,
        description: "Cardio and strength training.",
      },
      {
        title: "JavaScript Course",
        type: "learning",
        date: "Yesterday, 6:30 PM",
        duration: 90,
        description: "Completed module on async/await.",
      },
      {
        title: "Read 'Deep Work'",
        type: "reading",
        date: "Yesterday, 9:00 PM",
        duration: 45,
        description: "Started chapter 3 on the importance of focus.",
      },
      {
        title: "Meditation",
        type: "mindfulness",
        date: "2 days ago, 7:15 AM",
        duration: 20,
        description: "Morning meditation focusing on gratitude.",
      },
      {
        title: "Guitar Practice",
        type: "hobby",
        date: "2 days ago, 8:30 PM",
        duration: 30,
        description: "Practiced new chord progressions and scales.",
      },
      {
        title: "Language Learning",
        type: "learning",
        date: "3 days ago, 5:00 PM",
        duration: 45,
        description: "Spanish vocabulary practice.",
      },
      {
        title: "Yoga Session",
        type: "exercise",
        date: "3 days ago, 6:00 AM",
        duration: 60,
        description: "Morning yoga flow focusing on flexibility.",
      },
      {
        title: "Journal Writing",
        type: "mindfulness",
        date: "4 days ago, 9:30 PM",
        duration: 25,
        description: "Reflected on daily achievements and areas for improvement.",
      },
      {
        title: "Online Workshop",
        type: "learning",
        date: "5 days ago, 1:00 PM",
        duration: 120,
        description: "Attended workshop on productivity techniques.",
      },
    ],
    achievements: [
      {
        title: "Reading Streak",
        description: "Read for 7 days in a row",
      },
      {
        title: "Exercise Master",
        description: "Completed 20 hours of exercise",
      },
      {
        title: "Learning Pioneer",
        description: "Spent 50 hours learning new skills",
      },
    ],
    streak: {
      current: 8,
      longest: 15,
      weeklyProgress: 75,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456", // In a real app, this would be hashed
    totalActivities: 20,
    newActivities: 2,
    readingHours: 6,
    readingGoal: 8,
    readingProgress: 75,
    readingRank: 2,
    exerciseHours: 6,
    exerciseGoal: 8,
    exerciseProgress: 75,
    exerciseRank: 1,
    learningHours: 10,
    learningGoal: 14,
    learningProgress: 71,
    learningRank: 2,
    totalPoints: 780,
    totalProgress: 74,
    weeklyActivity: [
      { name: "Mon", reading: 0.5, exercise: 1, learning: 1.5 },
      { name: "Tue", reading: 1, exercise: 1, learning: 1 },
      { name: "Wed", reading: 1, exercise: 1.5, learning: 1.5 },
      { name: "Thu", reading: 1.5, exercise: 1, learning: 1 },
      { name: "Fri", reading: 1, exercise: 1, learning: 2 },
      { name: "Sat", reading: 0.5, exercise: 0, learning: 1.5 },
      { name: "Sun", reading: 0.5, exercise: 0.5, learning: 1.5 },
    ],
    monthlyActivity: [
      { name: "Week 1", reading: 5, exercise: 5, learning: 8 },
      { name: "Week 2", reading: 5.5, exercise: 5.5, learning: 9 },
      { name: "Week 3", reading: 6, exercise: 6, learning: 10 },
      { name: "Week 4", reading: 6, exercise: 6, learning: 10 },
    ],
    recentActivities: [
      {
        title: "Yoga Session",
        type: "exercise",
        date: "Today, 8:00 AM",
        duration: 60,
        description: "Morning yoga and meditation.",
      },
      {
        title: "Read 'Thinking, Fast and Slow'",
        type: "reading",
        date: "Yesterday, 9:30 PM",
        duration: 45,
        description: "Read about cognitive biases.",
      },
      {
        title: "UX Design Course",
        type: "learning",
        date: "Yesterday, 7:00 PM",
        duration: 75,
        description: "Learned about user research methods.",
      },
      {
        title: "Running",
        type: "exercise",
        date: "2 days ago, 7:30 AM",
        duration: 30,
        description: "Morning run in the park.",
      },
      {
        title: "Cooking Class",
        type: "hobby",
        date: "2 days ago, 6:00 PM",
        duration: 90,
        description: "Learned to make new healthy recipes.",
      },
      {
        title: "Meditation",
        type: "mindfulness",
        date: "3 days ago, 7:00 AM",
        duration: 20,
        description: "Guided meditation for focus and clarity.",
      },
      {
        title: "Photography Walk",
        type: "hobby",
        date: "3 days ago, 5:30 PM",
        duration: 60,
        description: "Practiced landscape photography techniques.",
      },
      {
        title: "Data Science Course",
        type: "learning",
        date: "4 days ago, 8:00 PM",
        duration: 60,
        description: "Learned about statistical analysis methods.",
      },
      {
        title: "Journaling",
        type: "mindfulness",
        date: "5 days ago, 10:00 PM",
        duration: 15,
        description: "Evening gratitude journaling practice.",
      },
      {
        title: "Dance Class",
        type: "exercise",
        date: "6 days ago, 7:00 PM",
        duration: 60,
        description: "Weekly dance class focusing on rhythm and coordination.",
      },
    ],
    achievements: [
      {
        title: "Exercise Streak",
        description: "Exercised for 10 days in a row",
      },
      {
        title: "Reading Enthusiast",
        description: "Read for 30 hours this month",
      },
      {
        title: "Learning Devotee",
        description: "Completed 5 different learning activities",
      },
    ],
    streak: {
      current: 6,
      longest: 12,
      weeklyProgress: 68,
    },
  },
]

// Mock weekly achievements
const weeklyAchievements = [
  {
    title: "Reading Champion",
    userName: "John Doe",
    description: "Read for more than 8 hours this week",
  },
  {
    title: "Exercise Master",
    userName: "Jane Smith",
    description: "Completed 6 hours of exercise this week",
  },
  {
    title: "Learning Pioneer",
    userName: "John Doe",
    description: "Spent 12 hours learning new skills",
  },
  {
    title: "Consistency King",
    userName: "Jane Smith",
    description: "Logged activities every day this week",
  },
]

// Mock blog data
const blogPosts = [
  {
    id: "1",
    slug: "building-consistent-habits",
    title: "Building Consistent Habits That Last",
    excerpt: "Learn how to create habits that stick through small, consistent actions and proper environment design.",
    author: "John Doe",
    date: "May 15, 2025",
    image: "/placeholder.svg?height=300&width=600",
    category: "Productivity",
    featured: true,
    content: `
# Building Consistent Habits That Last

Consistency is the key to transformation. Anyone can be motivated for a day or a week, but building lasting habits requires a different approach.

## Start Small, Really Small

The biggest mistake people make when trying to build new habits is starting too big. Instead of committing to an hour of reading daily, start with just 5-10 minutes. This makes it nearly impossible to fail.

## Design Your Environment

Your environment often dictates your behavior. Want to read more? Keep books in visible places around your home. Want to exercise more? Sleep in your workout clothes or keep your running shoes by the door.

## Use Habit Stacking

One of the best ways to build a new habit is to identify a current habit you already do each day and then stack your new behavior on top. For example, "After I pour my morning coffee, I will read for 10 minutes."

## Track Your Progress

Keep a record of your streak. There's something powerful about seeing a chain of successful days and not wanting to break it.

## Implement the Two-Day Rule

Never miss two days in a row. You can miss one day, but never two. This gives you flexibility while ensuring you don't lose momentum.

## Focus on the Process, Not the Outcome

Don't get too focused on results. Instead, commit to the process and trust that the results will follow. Remember, it's about progress, not perfection.

Building lasting habits isn't about willpower or motivation—it's about creating a system that makes it easy to do the right thing and hard to fail.
  `,
  },
  {
    id: "2",
    slug: "mindfulness-productivity",
    title: "How Mindfulness Enhances Productivity",
    excerpt:
      "Discover how mindfulness practices can actually improve your focus, creativity, and overall productivity.",
    author: "Jane Smith",
    date: "May 10, 2025",
    image: "/placeholder.svg?height=300&width=600",
    category: "Mindfulness",
    featured: true,
    content: `
# How Mindfulness Enhances Productivity

In today's fast-paced world, we often confuse being busy with being productive. Mindfulness—the practice of focused awareness on the present moment—can transform how you work.

## The Myth of Multitasking

Research consistently shows that multitasking doesn't work. When we think we're multitasking, we're actually task-switching, which reduces our efficiency and increases errors.

Mindfulness trains your brain to focus on one thing at a time, dramatically improving your ability to complete tasks effectively.

## The Mindful Work Cycle

Try implementing this mindful work cycle:

1. **Set a clear intention** for what you want to accomplish
2. **Remove distractions** from your environment
3. **Focus completely** for 25-50 minutes
4. **Take a mindful break** for 5-10 minutes
5. **Reflect** briefly on what you accomplished
6. Repeat

## Start Your Day Mindfully

Instead of immediately checking email or social media, spend the first 10 minutes of your day in silence. This creates a centered foundation that carries throughout your day.

## Practice Mindful Transitions

The spaces between tasks are just as important as the tasks themselves. Take a few deep breaths between activities to reset your mental state.

## The Counterintuitive Truth

Sometimes the most productive thing you can do is nothing at all. Regular periods of rest and reflection are essential for sustained high performance.

By bringing mindfulness to your work, you'll not only accomplish more, but you'll experience greater satisfaction and less stress along the way.
  `,
  },
  {
    id: "3",
    slug: "evening-routines-success",
    title: "Evening Routines for Tomorrow's Success",
    excerpt: "How your evening routine can set you up for a productive and successful tomorrow.",
    author: "John Doe",
    date: "May 5, 2025",
    image: "/placeholder.svg?height=300&width=600",
    category: "Productivity",
    featured: false,
    content: `
# Evening Routines for Tomorrow's Success

While morning routines get a lot of attention, what you do in the evening can be just as important for your productivity and success.

## Plan Tomorrow Tonight

Take 10 minutes each evening to plan your next day. Identify your top 3 priorities and schedule when you'll tackle them. This eliminates decision fatigue in the morning and gives your subconscious time to process challenges overnight.

## Digital Sunset

Set a time (ideally 1-2 hours before bed) when you'll stop using screens. Blue light from devices can disrupt your sleep quality, and the constant stimulation keeps your mind active when it should be winding down.

## Prepare Your Environment

Set out what you'll need for the next day—your clothes, meals, materials for work, etc. This reduces friction in the morning and makes it easier to start your day successfully.

## Reflection and Gratitude

Take a few minutes to reflect on what went well during the day and what you could improve. Then, identify three things you're grateful for. This positive mindset helps you sleep better and wake up more optimistic.

## Reading Over Scrolling

Replace social media scrolling with reading a physical book. This helps calm your mind and often provides valuable insights, unlike the dopamine hits of digital content.

## Consistent Sleep Schedule

Try to go to bed and wake up at the same time each day. Your body thrives on consistency, and a regular sleep schedule improves both sleep quality and daytime energy.

By implementing a thoughtful evening routine, you're essentially setting up a launch pad for your morning self—making it much easier to have productive, successful days.
  `,
  },
  {
    id: "4",
    slug: "learning-effectively",
    title: "How to Learn Anything More Effectively",
    excerpt: "Strategies to accelerate your learning and retain information better, based on cognitive science.",
    author: "Jane Smith",
    date: "April 30, 2025",
    image: "/placeholder.svg?height=300&width=600",
    category: "Learning",
    featured: false,
    content: `
# How to Learn Anything More Effectively

Whether you're learning a new language, developing a professional skill, or pursuing a hobby, these evidence-based techniques will help you learn faster and remember more.

## The Spacing Effect

Instead of cramming all at once, space out your learning sessions over time. Research shows that spaced repetition leads to far better long-term retention than massed practice.

For example, studying for 30 minutes daily for a week is more effective than studying for 3.5 hours in one day.

## Active Recall

Don't just reread or highlight material—actively test yourself on it. Close your book or notes and try to explain the concept in your own words, or quiz yourself with flashcards.

This effort to retrieve information strengthens the neural pathways associated with that knowledge.

## Interleaving

Rather than focusing on one skill or topic for an extended period, mix up different but related topics in a single study session.

For example, when learning math, practice different types of problems rather than completing 20 of the same kind in a row.

## The Feynman Technique

To truly understand something, try explaining it to a child. This forces you to translate complex ideas into simple language, revealing gaps in your understanding.

## Teach What You Learn

Teaching others—or even pretending to teach—dramatically increases your own comprehension and retention. Try explaining what you've learned to someone else, or record yourself explaining the concept.

## Connect to Prior Knowledge

When learning something new, actively look for connections to things you already know. These mental hooks give new information something to "stick" to in your memory.

## Embrace Difficulty

Learning should feel challenging. If it's too easy, you're probably not learning optimally. The concept of "desirable difficulty" shows that the right amount of struggle actually enhances learning.

By incorporating these strategies into your approach to learning, you'll not only learn more efficiently but develop a deeper understanding of the material.
  `,
  },
  {
    id: "5",
    slug: "goal-setting-strategies",
    title: "Goal Setting Strategies That Actually Work",
    excerpt: "Move beyond SMART goals with these advanced strategies for setting and achieving meaningful goals.",
    author: "John Doe",
    date: "April 25, 2025",
    image: "/placeholder.svg?height=300&width=600",
    category: "Personal Development",
    featured: false,
    content: `
# Goal Setting Strategies That Actually Work

We all know about SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound), but effective goal setting goes beyond this basic framework.

## Start with Your "Why"

Before defining what you want to achieve, clarify why it matters to you. Goals connected to your core values are much more likely to be pursued with dedication and resilience.

Ask yourself: "Why is this goal important to me? How does it align with my deeper values and vision for my life?"

## Set Process Goals, Not Just Outcome Goals

Outcome goals focus on results (e.g., "lose 20 pounds"), while process goals focus on the behaviors that lead to those results (e.g., "exercise 30 minutes daily" or "prepare healthy meals").

Process goals give you daily wins and keep you focused on what you can directly control.

## The 1% Rule: Aim for Tiny Improvements

Rather than pursuing dramatic changes, focus on improving by just 1% in key areas. These small gains compound dramatically over time.

A 1% improvement each day for a year results in being 37 times better by the end of the year.

## Build an Implementation Intention

Don't just decide what you'll do—decide when and where you'll do it.

Research shows that goals framed as "When situation X arises, I will perform response Y" are far more likely to be accomplished.

## Create Accountability Systems

We're more likely to follow through when others are watching. Share your goals with someone who will hold you accountable, or use public commitment by announcing your goals.

## Regular Review and Adjustment

Set a recurring calendar appointment to review your progress. Are you on track? Has anything changed that requires adjusting your goal or approach?

This prevents the common pattern of setting goals and then forgetting about them.

## Celebrate Milestones

Don't wait until you've achieved the final goal to celebrate. Acknowledge your progress along the way with meaningful rewards that don't undermine your goal.

By implementing these strategies, you'll move beyond simplistic goal-setting approaches and develop a more sophisticated system that actually leads to achievement.
  `,
  },
]

// Mock chat data
const chatMessages = [
  {
    id: "1",
    user: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "Hey everyone! I've been struggling with consistency in my reading habit. Any tips on how to make it stick?",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "I've found that reading at the same time every day helps a lot. I've made it part of my morning routine before checking emails or social media.",
    timestamp: "1 hour 45 min ago",
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "Setting a really small goal helped me. I started with just 10 pages a day, and now I'm up to 30-40 pages without even trying.",
    timestamp: "1 hour 30 min ago",
  },
  {
    id: "4",
    user: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message: "Those are great suggestions! Do you track your reading in any specific way?",
    timestamp: "1 hour 20 min ago",
  },
  {
    id: "5",
    user: {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "I use the GrowthTracker app to log my reading sessions. It's motivating to see the streak grow day by day!",
    timestamp: "1 hour ago",
  },
  {
    id: "6",
    user: {
      id: "4",
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "Environmental design is key for me. I keep books in every room and removed social media apps from my phone. Made a huge difference!",
    timestamp: "45 min ago",
  },
  {
    id: "7",
    user: {
      id: "5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "I joined a book club that meets weekly. The social accountability keeps me on track with my reading goals.",
    timestamp: "30 min ago",
  },
  {
    id: "8",
    user: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "Thanks everyone! I'm going to try implementing the fixed time approach and start with a smaller page goal. Will update you on my progress next week!",
    timestamp: "15 min ago",
  },
]

// Authentication actions
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // In a real app, you would validate credentials against a database
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Set a cookie to simulate authentication
    cookies().set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    redirect("/dashboard")
  } else {
    // In a real app, you would handle this error better
    redirect("/login?error=Invalid credentials")
  }
}

export async function signup(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate passwords match
  if (password !== confirmPassword) {
    redirect("/signup?error=Passwords do not match")
  }

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    redirect("/signup?error=User already exists")
  }

  // In a real app, you would create a new user in the database
  // For this demo, we'll just simulate a successful signup

  // Set a cookie to simulate authentication
  cookies().set("userId", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/dashboard")
}

// Data fetching actions - modified to bypass authentication for testing
export async function getUserData() {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return null
  }

  // In a real app, you would fetch user data from a database
  return users.find((u) => u.id === userId)
}

// Test version that doesn't require authentication
export async function getTestUserData() {
  // Always return the first user for testing
  return users[0]
}

export async function getLeaderboardData() {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return null
  }

  // In a real app, you would fetch leaderboard data from a database
  return {
    users,
    weeklyAchievements,
  }
}

// Test version that doesn't require authentication
export async function getTestLeaderboardData() {
  // Always return the data for testing
  return {
    users,
    weeklyAchievements,
  }
}

// Blog related actions
export async function getBlogPosts() {
  // In a real app, you'd fetch this from a database
  return blogPosts
}

export async function getBlogPostBySlug(slug: string) {
  // In a real app, you'd fetch this from a database
  return blogPosts.find((post) => post.slug === slug)
}

// Chat related actions
export async function getChatMessages() {
  // In a real app, you'd fetch this from a database
  return chatMessages
}

export async function sendChatMessage(formData: FormData) {
  const message = formData.get("message") as string

  if (!message.trim()) {
    return { error: "Message cannot be empty" }
  }

  // In a real app, you would save this message to the database
  // For this demo, we'll just return success
  return { success: true }
}

// Activity management actions
export async function addActivity(formData: FormData) {
  // For testing, we don't need to check authentication
  const title = formData.get("title") as string
  const type = formData.get("type") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const description = formData.get("description") as string

  // In a real app, you would add this activity to the database
  // For this demo, we'll just simulate a successful addition

  // Return to the dashboard
  redirect("/dashboard")
}

