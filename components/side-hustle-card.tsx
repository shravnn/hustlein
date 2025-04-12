"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, DollarSign, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface SideHustleCardProps {
  id: string
  title: string
  description: string
  level: number
  earnings: string
  timeCommitment: string
  icon: ReactNode
  unlocked: boolean
  progress?: number
}

export function SideHustleCard({
  id,
  title,
  description,
  level,
  earnings,
  timeCommitment,
  icon,
  unlocked,
  progress = 0,
}: SideHustleCardProps) {
  const isCompleted = progress === 100

  return (
    <Card className={`border-0 shadow-sm transition-all hover:shadow-md ${unlocked ? "" : "opacity-75"}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">{icon}</div>
          <Badge
            variant={unlocked ? "default" : "outline"}
            className={unlocked ? "bg-secondary text-secondary-foreground" : ""}
          >
            Level {level}
          </Badge>
        </div>
        <CardTitle className={`text-xl ${!unlocked && "text-muted-foreground"}`}>
          {title}
          {isCompleted && <CheckCircle className="inline-block ml-2 h-4 w-4 text-secondary" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center gap-2">
          <DollarSign className={`h-4 w-4 ${unlocked ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`text-sm ${!unlocked && "text-muted-foreground"}`}>{earnings}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${unlocked ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`text-sm ${!unlocked && "text-muted-foreground"}`}>{timeCommitment}</span>
        </div>

        {progress > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-muted rounded-full"
              indicatorClassName={isCompleted ? "bg-secondary" : "bg-primary"}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {unlocked ? (
          <Link href="/learning" className="w-full">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
              {progress === 0 ? "Start Learning" : progress === 100 ? "Review Again" : "Continue Learning"}
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full bg-muted text-muted-foreground rounded-full">
            <Lock className="mr-2 h-4 w-4" />
            Reach Level {level} to Unlock
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
