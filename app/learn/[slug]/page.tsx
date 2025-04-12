"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, BookOpen, ArrowLeft, Play, CheckCircle, Award } from "lucide-react"
import { useUser } from "@/context/user-context"
import { SideHustleQuiz } from "@/components/side-hustle-quiz"
import { useToast } from "@/components/ui/use-toast"
import confetti from "canvas-confetti"

export default function LearnSideHustlePage({ params }: { params: { slug: string } }) {
  const { sideHustles, updateSideHustleProgress, completeSideHustle } = useUser()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("learn")
  const [showQuiz, setShowQuiz] = useState(false)
  const [sideHustle, setSideHustle] = useState<any>(null)

  useEffect(() => {
    const hustle = sideHustles.find((h) => h.id === params.slug)
    if (hustle) {
      setSideHustle(hustle)
    }
  }, [params.slug, sideHustles])

  const handleCompleteLesson = () => {
    if (!sideHustle) return

    // Update progress to 50% after completing lesson
    updateSideHustleProgress(sideHustle.id, 50)

    toast({
      title: "Lesson completed!",
      description: "You've earned 50 XP. Take the quiz to earn more!",
      duration: 3000,
    })

    // Show quiz option
    setShowQuiz(true)
  }

  const handleCompleteQuiz = () => {
    if (!sideHustle) return

    // Mark side hustle as completed
    completeSideHustle(sideHustle.id)

    toast({
      title: "Side Hustle Mastered!",
      description: "You've completed this side hustle and earned 500 XP!",
      duration: 5000,
    })

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    })

    // Hide quiz
    setShowQuiz(false)
  }

  if (!sideHustle) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <header className="w-full py-4 bg-primary">
          <div className="container flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
              <Trophy className="h-6 w-6" />
              <span>HustleUp.</span>
            </Link>
            <Link href="/learn">
              <Button variant="ghost" className="text-primary-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Side Hustles
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </main>
      </div>
    )
  }

  if (showQuiz) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <header className="w-full py-4 bg-primary">
          <div className="container flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
              <Trophy className="h-6 w-6" />
              <span>HustleUp.</span>
            </Link>
            <Link href="/learn">
              <Button variant="ghost" className="text-primary-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Side Hustles
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 container py-8">
          <SideHustleQuiz hustleId={sideHustle.id} title={sideHustle.title} onComplete={handleCompleteQuiz} />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="w-full py-4 bg-primary">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
            <Trophy className="h-6 w-6" />
            <span>HustleUp.</span>
          </Link>
          <Link href="/learn">
            <Button variant="ghost" className="text-primary-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Side Hustles
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{sideHustle.title}</h1>
                <p className="text-muted-foreground">{sideHustle.description}</p>
              </div>
            </div>

            <Card className="mb-6 border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{sideHustle.progress}%</span>
                  </div>
                  <Progress
                    value={sideHustle.progress}
                    className="h-3 bg-muted rounded-full"
                    indicatorClassName="bg-secondary rounded-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-muted rounded-full w-full justify-start mb-6">
                <TabsTrigger value="learn" className="rounded-full">
                  Learn
                </TabsTrigger>
                <TabsTrigger value="resources" className="rounded-full">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="community" className="rounded-full">
                  Community
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-secondary" />
                      Introduction to {sideHustle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Welcome to your {sideHustle.title} journey! This side hustle is perfect for those who want to{" "}
                      {sideHustle.id === "freelance-writing"
                        ? "express themselves through words and help businesses communicate effectively"
                        : sideHustle.id === "social-media-management"
                          ? "help businesses build their online presence and engage with customers"
                          : sideHustle.id === "virtual-assistant"
                            ? "provide administrative support remotely and help professionals stay organized"
                            : sideHustle.id === "graphic-design"
                              ? "create visual content that communicates ideas and solves problems"
                              : "share their knowledge and help others learn new skills"}
                      .
                    </p>
                    <p>
                      In this lesson, you'll learn the basics of getting started, finding clients, and setting your
                      rates. By the end, you'll have a solid foundation to start earning with this side hustle!
                    </p>

                    <div className="bg-muted p-4 rounded-xl">
                      <h3 className="font-medium mb-2">What you'll learn:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span>The fundamentals of {sideHustle.title}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span>How to find your first clients</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span>Setting your rates and getting paid</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span>Tools and resources to get started</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleCompleteLesson}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
                      >
                        Complete Lesson & Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Helpful Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer">
                        <Award className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">Beginner's Guide to {sideHustle.title}</h3>
                          <p className="text-sm text-muted-foreground">A comprehensive guide to get you started</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer">
                        <Award className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">Top Tools for {sideHustle.title}</h3>
                          <p className="text-sm text-muted-foreground">Essential tools to boost your productivity</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer">
                        <Award className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">Finding Clients for {sideHustle.title}</h3>
                          <p className="text-sm text-muted-foreground">Strategies to land your first clients</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Community</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Connect with other learners who are also exploring {sideHustle.title} as a side hustle!</p>
                    <div className="bg-muted p-6 rounded-xl text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-secondary" />
                      <h3 className="text-lg font-medium mb-2">Join the Community</h3>
                      <p className="text-muted-foreground mb-4">Share tips, ask questions, and connect with peers</p>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                        Join Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
