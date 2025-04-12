"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, BookOpen, Star, Clock, DollarSign, Briefcase, Code, GraduationCap, Palette } from "lucide-react"
import { SideHustleCard } from "@/components/side-hustle-card"
import { LevelProgressBar } from "@/components/level-progress-bar"
import { useUser } from "@/context/user-context"
import { useState } from "react"

export default function LearnPage() {
  const { sideHustles, level, recommendedHustles } = useUser()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeLevel, setActiveLevel] = useState<number | null>(null)

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-10 w-10 text-white" />
      case "Briefcase":
        return <Briefcase className="h-10 w-10 text-white" />
      case "Clock":
        return <Clock className="h-10 w-10 text-white" />
      case "Code":
        return <Code className="h-10 w-10 text-white" />
      case "Palette":
        return <Palette className="h-10 w-10 text-white" />
      case "GraduationCap":
        return <GraduationCap className="h-10 w-10 text-white" />
      default:
        return <Star className="h-10 w-10 text-white" />
    }
  }

  const filterSideHustles = () => {
    let filtered = [...sideHustles]

    if (activeLevel !== null) {
      filtered = filtered.filter((hustle) => hustle.level === activeLevel)
    }

    if (activeFilter === "inprogress") {
      filtered = filtered.filter((hustle) => hustle.progress > 0 && hustle.progress < 100)
    } else if (activeFilter === "completed") {
      filtered = filtered.filter((hustle) => hustle.completed)
    } else if (activeFilter === "recommended") {
      filtered = filtered.filter((hustle) => recommendedHustles.includes(hustle.id))
    }

    return filtered
  }

  const handleLevelFilter = (level: number) => {
    setActiveLevel(activeLevel === level ? null : level)
  }

  const handleClearFilters = () => {
    setActiveLevel(null)
    setActiveFilter(null)
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
            <Link href="/" className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-primary-foreground border-b border-primary-foreground pb-1"
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
          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr]">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <LevelProgressBar />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <h3 className="font-medium">Filter Side Hustles</h3>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">By Level</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={activeLevel === 1 ? "default" : "outline"}
                      size="sm"
                      className={`justify-start rounded-full ${activeLevel === 1 ? "bg-secondary text-secondary-foreground" : ""}`}
                      onClick={() => handleLevelFilter(1)}
                    >
                      Level 1
                    </Button>
                    <Button
                      variant={activeLevel === 2 ? "default" : "outline"}
                      size="sm"
                      className={`justify-start rounded-full ${activeLevel === 2 ? "bg-secondary text-secondary-foreground" : ""}`}
                      onClick={() => handleLevelFilter(2)}
                    >
                      Level 2
                    </Button>
                    <Button
                      variant={activeLevel === 3 ? "default" : "outline"}
                      size="sm"
                      className={`justify-start rounded-full ${activeLevel === 3 ? "bg-secondary text-secondary-foreground" : ""}`}
                      onClick={() => handleLevelFilter(3)}
                    >
                      Level 3
                    </Button>
                    <Button
                      variant={activeLevel === 4 ? "default" : "outline"}
                      size="sm"
                      className={`justify-start rounded-full ${activeLevel === 4 ? "bg-secondary text-secondary-foreground" : ""}`}
                      onClick={() => handleLevelFilter(4)}
                    >
                      Level 4+
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">By Category</h4>
                  <div className="grid gap-2">
                    <Button variant="outline" size="sm" className="justify-start rounded-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Content Creation
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start rounded-full">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Professional Services
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start rounded-full">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Finance
                    </Button>
                  </div>
                </div>
                {(activeLevel !== null || activeFilter !== null) && (
                  <Button
                    onClick={handleClearFilters}
                    className="w-full rounded-full border-primary text-primary-foreground hover:bg-primary/10"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <Tabs
                defaultValue="all"
                value={activeFilter || "all"}
                onValueChange={(value) => setActiveFilter(value === "all" ? null : value)}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <TabsList className="bg-muted rounded-full">
                    <TabsTrigger value="all" className="rounded-full">
                      All Side Hustles
                    </TabsTrigger>
                    <TabsTrigger value="recommended" className="rounded-full">
                      Recommended
                    </TabsTrigger>
                    <TabsTrigger value="inprogress" className="rounded-full">
                      In Progress
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-full">
                      Completed
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filterSideHustles().map((hustle) => (
                      <SideHustleCard
                        key={hustle.id}
                        title={hustle.title}
                        description={hustle.description}
                        level={hustle.level}
                        earnings={hustle.earnings}
                        timeCommitment={hustle.timeCommitment}
                        icon={getIconComponent(hustle.icon)}
                        unlocked={level >= hustle.level}
                        progress={hustle.progress}
                        id={hustle.id}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="recommended" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filterSideHustles().length > 0 ? (
                      filterSideHustles().map((hustle) => (
                        <SideHustleCard
                          key={hustle.id}
                          title={hustle.title}
                          description={hustle.description}
                          level={hustle.level}
                          earnings={hustle.earnings}
                          timeCommitment={hustle.timeCommitment}
                          icon={getIconComponent(hustle.icon)}
                          unlocked={level >= hustle.level}
                          progress={hustle.progress}
                          id={hustle.id}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                          <Trophy className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No recommendations yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md">
                          Take the assessment to get personalized side hustle recommendations based on your skills and
                          interests.
                        </p>
                        <Link href="/assessment" className="mt-4">
                          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                            Take Assessment
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="inprogress" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filterSideHustles().length > 0 ? (
                      filterSideHustles().map((hustle) => (
                        <SideHustleCard
                          key={hustle.id}
                          title={hustle.title}
                          description={hustle.description}
                          level={hustle.level}
                          earnings={hustle.earnings}
                          timeCommitment={hustle.timeCommitment}
                          icon={getIconComponent(hustle.icon)}
                          unlocked={level >= hustle.level}
                          progress={hustle.progress}
                          id={hustle.id}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                          <BookOpen className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No side hustles in progress</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md">
                          Start learning a side hustle to track your progress here.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filterSideHustles().length > 0 ? (
                      filterSideHustles().map((hustle) => (
                        <SideHustleCard
                          key={hustle.id}
                          title={hustle.title}
                          description={hustle.description}
                          level={hustle.level}
                          earnings={hustle.earnings}
                          timeCommitment={hustle.timeCommitment}
                          icon={getIconComponent(hustle.icon)}
                          unlocked={level >= hustle.level}
                          progress={hustle.progress}
                          id={hustle.id}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                          <Trophy className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No completed side hustles yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md">
                          Complete all lessons, quizzes, and real-life applications for a side hustle to mark it as
                          completed.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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
