"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SideHustle = {
  id: string
  title: string
  description: string
  level: number
  earnings: string
  timeCommitment: string
  progress: number
  completed: boolean
  icon: string
}

type UserContextType = {
  level: number
  xp: number
  maxXp: number
  progress: number
  sideHustles: SideHustle[]
  addXp: (amount: number) => void
  updateSideHustleProgress: (id: string, progress: number) => void
  completeSideHustle: (id: string) => void
  assessmentCompleted: boolean
  setAssessmentCompleted: (completed: boolean) => void
  recommendedHustles: string[]
  setRecommendedHustles: (hustles: string[]) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [maxXp, setMaxXp] = useState(1000)
  const [progress, setProgress] = useState(0)
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [recommendedHustles, setRecommendedHustles] = useState<string[]>([])

  const [sideHustles, setSideHustles] = useState<SideHustle[]>([
    {
      id: "freelance-writing",
      title: "Freelance Writing",
      description: "Create content for blogs, websites, and businesses.",
      level: 1,
      earnings: "$15-50/hr",
      timeCommitment: "Flexible",
      progress: 0,
      completed: false,
      icon: "BookOpen",
    },
    {
      id: "social-media-management",
      title: "Social Media Management",
      description: "Manage social accounts for small businesses.",
      level: 2,
      earnings: "$20-35/hr",
      timeCommitment: "10-15 hrs/week",
      progress: 0,
      completed: false,
      icon: "Briefcase",
    },
    {
      id: "virtual-assistant",
      title: "Virtual Assistant",
      description: "Provide administrative support remotely.",
      level: 2,
      earnings: "$15-30/hr",
      timeCommitment: "Flexible",
      progress: 0,
      completed: false,
      icon: "Clock",
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Build websites and web applications for clients.",
      level: 4,
      earnings: "$25-75/hr",
      timeCommitment: "Project-based",
      progress: 0,
      completed: false,
      icon: "Code",
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      description: "Create visual content for brands and businesses.",
      level: 3,
      earnings: "$20-50/hr",
      timeCommitment: "Project-based",
      progress: 0,
      completed: false,
      icon: "Palette",
    },
    {
      id: "online-tutoring",
      title: "Online Tutoring",
      description: "Teach subjects you're knowledgeable about.",
      level: 1,
      earnings: "$15-40/hr",
      timeCommitment: "5-15 hrs/week",
      progress: 0,
      completed: false,
      icon: "GraduationCap",
    },
  ])

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("hustleUpUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setLevel(userData.level || 1)
      setXp(userData.xp || 0)
      setMaxXp(userData.maxXp || 1000)
      setProgress(userData.progress || 0)
      setSideHustles(userData.sideHustles || sideHustles)
      setAssessmentCompleted(userData.assessmentCompleted || false)
      setRecommendedHustles(userData.recommendedHustles || [])
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "hustleUpUser",
      JSON.stringify({
        level,
        xp,
        maxXp,
        progress,
        sideHustles,
        assessmentCompleted,
        recommendedHustles,
      }),
    )
  }, [level, xp, maxXp, progress, sideHustles, assessmentCompleted, recommendedHustles])

  // Calculate progress whenever xp changes
  useEffect(() => {
    const newProgress = Math.min(Math.floor((xp / maxXp) * 100), 100)
    setProgress(newProgress)

    // Level up if XP exceeds maxXp
    if (xp >= maxXp) {
      setLevel((prevLevel) => prevLevel + 1)
      setXp(xp - maxXp)
      setMaxXp((prevMaxXp) => Math.floor(prevMaxXp * 1.5)) // Increase XP required for next level
    }
  }, [xp, maxXp])

  const addXp = (amount: number) => {
    setXp((prevXp) => prevXp + amount)
  }

  const updateSideHustleProgress = (id: string, newProgress: number) => {
    setSideHustles((prevHustles) =>
      prevHustles.map((hustle) => (hustle.id === id ? { ...hustle, progress: newProgress } : hustle)),
    )
  }

  const completeSideHustle = (id: string) => {
    setSideHustles((prevHustles) =>
      prevHustles.map((hustle) => (hustle.id === id ? { ...hustle, completed: true, progress: 100 } : hustle)),
    )
    // Award XP for completing a side hustle
    addXp(500)
  }

  return (
    <UserContext.Provider
      value={{
        level,
        xp,
        maxXp,
        progress,
        sideHustles,
        addXp,
        updateSideHustleProgress,
        completeSideHustle,
        assessmentCompleted,
        setAssessmentCompleted,
        recommendedHustles,
        setRecommendedHustles,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
