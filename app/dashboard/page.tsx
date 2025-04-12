"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Briefcase,
  BarChart,
  Sparkles,
  Clock,
  Code,
  Palette,
  GraduationCap,
} from "lucide-react"
import { LevelProgressBar } from "@/components/level-progress-bar"
import { useUser } from "@/context/user-context"

export default function DashboardPage() {
  const { sideHustles, level, xp, recommendedHustles } = useUser()

  // Get side hustles in progress
  const inProgressHustles = sideHustles.filter((hustle) => hustle.progress > 0 && hustle.progress < 100)

  // Get completed side hustles
  const completedHustles = sideHustles.filter((hustle) => hustle.progress === 100)

  // Get recommended side hustles
  const recommendedSideHustles = sideHustles
    .filter((hustle) => recommendedHustles.includes(hustle.id) && hustle.level <= level)
    .slice(0, 2)

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "Briefcase":
        return <Briefcase className="h-5 w-5 text-primary" />
      case "Clock":
        return <Clock className="h-5 w-5 text-primary" />
      case "Code":
        return <Code className="h-5 w-5 text-primary" />
      case "Palette":
        return <Palette className="h-5 w-5 text-primary" />
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5 text-primary" />
      default:
        return <Star className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="w-full py-4 bg-primary">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
            <Trophy className="h-6 w-6" />
            <span>HustleUp.</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-primary-foreground border-b border-primary-foreground pb-1"
            >
              Dashboard
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
            >
              Learn
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
            >
              Assessment
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>
            <span className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
              JD
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm col-span-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  Your Side Hustle Journey
                  <Sparkles className="h-5 w-5 text-secondary" />
                </CardTitle>
                <CardDescription>Track your progress and unlock new opportunities</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <LevelProgressBar />
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <div className="flex flex-col items-center gap-1 rounded-xl border p-3 hover:border-primary hover:bg-primary/5 transition-colors">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">
                      {inProgressHustles.length + completedHustles.length} Side Hustles
                    </span>
                    <span className="text-xs text-muted-foreground">Started</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-xl border p-3 hover:border-primary hover:bg-primary/5 transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">{completedHustles.length} Side Hustles</span>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-xl border p-3 hover:border-primary hover:bg-primary/5 transition-colors">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">{xp} XP</span>
                    <span className="text-xs text-muted-foreground">Earned</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-xl border p-3 hover:border-primary hover:bg-primary/5 transition-colors">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">$0</span>
                    <span className="text-xs text-muted-foreground">Earned</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/learn" className="w-full">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">In Progress</CardTitle>
                <CardDescription>Side hustles you're currently learning</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {inProgressHustles.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressHustles.map((hustle) => (
                      <div key={hustle.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{hustle.title}</span>
                          <span className="text-sm font-medium">{hustle.progress}%</span>
                        </div>
                        <Progress
                          value={hustle.progress}
                          className="h-2 bg-muted rounded-full"
                          indicatorClassName="bg-primary rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 text-muted" />
                    <p className="text-sm text-muted-foreground">No side hustles in progress yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start learning to see your progress here</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/learn" className="w-full">
                  <Button variant="outline" className="w-full rounded-full">
                    View All Courses
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended For You</CardTitle>
                <CardDescription>Based on your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                {recommendedSideHustles.length > 0 ? (
                  <div className="space-y-4">
                    {recommendedSideHustles.map((hustle) => (
                      <Link href={`/learn/${hustle.id}`} key={hustle.id}>
                        <div className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                            {getIconComponent(hustle.icon)}
                          </div>
                          <div>
                            <h4 className="font-medium">{hustle.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {hustle.earnings} • Level {hustle.level}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Star className="h-12 w-12 mx-auto mb-2 text-muted" />
                    <p className="text-sm text-muted-foreground">No recommendations yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Take the assessment to get personalized recommendations
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/assessment" className="w-full">
                  <Button variant="outline" className="w-full rounded-full">
                    Take Assessment
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Quizzes</CardTitle>
                <CardDescription>Test your knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                {inProgressHustles.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressHustles.map((hustle) => (
                      <Link href={`/learn/${hustle.id}`} key={hustle.id}>
                        <div className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                            {getIconComponent(hustle.icon)}
                          </div>
                          <div>
                            <h4 className="font-medium">{hustle.title} Quiz</h4>
                            <p className="text-xs text-muted-foreground">5 questions • Earn XP</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 text-muted" />
                    <p className="text-sm text-muted-foreground">No quizzes available yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start learning to unlock quizzes</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full rounded-full">
                  View All Quizzes
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-sm md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Activity</CardTitle>
                <CardDescription>Your learning progress this week</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <BarChart className="h-16 w-16 text-muted opacity-50" />
                  <p className="text-sm text-muted-foreground mt-4">Activity chart will appear here</p>
                  <p className="text-xs text-muted-foreground">Keep learning to see your progress!</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full rounded-full">
                  View Detailed Stats
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="w-full bg-primary py-8 border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
            <Trophy className="h-6 w-6" />
            <span>HustleUp.</span>
          </div>
          <p className="text-center text-sm text-primary-foreground/70 md:text-left">
            &copy; {new Date().getFullYear()} HustleUp. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
