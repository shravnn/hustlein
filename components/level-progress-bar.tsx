"use client"

import { Progress } from "@/components/ui/progress"
import { Trophy, Sparkles } from "lucide-react"
import { useUser } from "@/context/user-context"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LevelProgressBar() {
  const { level, xp, maxXp, progress } = useUser()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger animation when progress changes
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-primary transition-all duration-500",
              animate && "scale-110 ring-4 ring-secondary ring-opacity-50",
            )}
          >
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">Level {level}</p>
              {animate && <Sparkles className="h-5 w-5 text-secondary animate-bounce" />}
            </div>
            <p className="text-sm text-muted-foreground">Keep going! You're doing great!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">XP Points</p>
          <p className="text-xl font-bold">
            {xp} <span className="text-sm text-muted-foreground">/ {maxXp}</span>
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress to Level {level + 1}</span>
          <span>{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-muted rounded-full"
          indicatorClassName={cn(
            "bg-secondary rounded-full transition-all duration-700",
            animate && "bg-gradient-to-r from-primary to-secondary",
          )}
        />
      </div>
    </div>
  )
}
