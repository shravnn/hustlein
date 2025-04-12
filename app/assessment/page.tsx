"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Trophy,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Briefcase,
  DollarSign,
  GraduationCap,
  Palette,
  Code,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/context/user-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const questions = [
  {
    id: "time",
    question: "How much time can you commit to a side hustle each week?",
    description: "Be realistic about your availability to ensure sustainable success.",
    options: [
      {
        value: "less-than-5",
        label: "Less than 5 hours",
        icon: <Clock />,
        description: "Perfect for beginners or those with limited time",
      },
      { value: "5-10", label: "5-10 hours", icon: <Clock />, description: "Good balance for most side hustles" },
      { value: "10-20", label: "10-20 hours", icon: <Clock />, description: "For more serious side hustlers" },
      {
        value: "20-plus",
        label: "20+ hours",
        icon: <Clock />,
        description: "For those looking to transition to full-time",
      },
      {
        value: "flexible",
        label: "Flexible/Varies",
        icon: <Clock />,
        description: "For those with irregular schedules",
      },
    ],
  },
  {
    id: "skills",
    question: "What skills are you most confident in?",
    description: "Choose the areas where you feel most comfortable.",
    options: [
      {
        value: "writing",
        label: "Writing & Communication",
        icon: <BookOpen />,
        description: "Content creation, copywriting, editing",
      },
      {
        value: "design",
        label: "Visual & Design",
        icon: <Palette />,
        description: "Graphic design, UI/UX, photography",
      },
      {
        value: "tech",
        label: "Technical & Development",
        icon: <Code />,
        description: "Coding, web development, data analysis",
      },
      {
        value: "teaching",
        label: "Teaching & Coaching",
        icon: <GraduationCap />,
        description: "Tutoring, coaching, creating courses",
      },
      {
        value: "admin",
        label: "Organization & Admin",
        icon: <Briefcase />,
        description: "Virtual assistance, project management",
      },
    ],
  },
  {
    id: "goals",
    question: "What's your primary goal with side hustling?",
    description: "Understanding your motivation will help us recommend the right opportunities.",
    options: [
      {
        value: "extra-income",
        label: "Extra Income",
        icon: <DollarSign />,
        description: "Supplement your current income",
      },
      {
        value: "new-skills",
        label: "Learn New Skills",
        icon: <BookOpen />,
        description: "Develop marketable abilities",
      },
      {
        value: "transition",
        label: "Career Transition",
        icon: <Briefcase />,
        description: "Move toward a new career path",
      },
      {
        value: "flexibility",
        label: "Work Flexibility",
        icon: <Clock />,
        description: "Create a more flexible work arrangement",
      },
      {
        value: "passion",
        label: "Pursue Passion",
        icon: <Trophy />,
        description: "Work on something you're passionate about",
      },
    ],
  },
  {
    id: "experience",
    question: "What's your experience level with side hustles?",
    description: "This helps us tailor recommendations to your experience level.",
    options: [
      {
        value: "complete-beginner",
        label: "Complete Beginner",
        icon: <BookOpen />,
        description: "Never done a side hustle before",
      },
      {
        value: "some-experience",
        label: "Some Experience",
        icon: <BookOpen />,
        description: "Tried a few things but not consistently",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        icon: <BookOpen />,
        description: "Have been side hustling for a while",
      },
      { value: "advanced", label: "Advanced", icon: <Trophy />, description: "Experienced and looking to expand" },
    ],
  },
  {
    id: "work-style",
    question: "What's your preferred work style?",
    description: "Different side hustles suit different work preferences.",
    options: [
      {
        value: "independent",
        label: "Independent Work",
        icon: <Briefcase />,
        description: "Work on your own terms and schedule",
      },
      {
        value: "collaborative",
        label: "Collaborative",
        icon: <Briefcase />,
        description: "Work with clients or team members",
      },
      { value: "structured", label: "Structured", icon: <Clock />, description: "Clear guidelines and expectations" },
      { value: "creative", label: "Creative Freedom", icon: <Palette />, description: "Express yourself and innovate" },
    ],
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addXp, setAssessmentCompleted, setRecommendedHustles } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Process results
      processResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const processResults = () => {
    // In a real app, this would be more sophisticated
    // For now, we'll use a simple mapping based on answers

    const recommendedHustles: string[] = []

    // Writing & Communication skills
    if (answers.skills === "writing") {
      recommendedHustles.push("freelance-writing")

      // If they have more time or want extra income
      if (answers.time === "10-20" || answers.time === "20-plus" || answers.goals === "extra-income") {
        recommendedHustles.push("content-creation")
      }
    }

    // Admin skills
    if (answers.skills === "admin" || answers.work_style === "structured") {
      recommendedHustles.push("virtual-assistant")
    }

    // Teaching skills
    if (answers.skills === "teaching" || answers.goals === "new-skills") {
      recommendedHustles.push("online-tutoring")
    }

    // Design skills
    if (answers.skills === "design" || answers.work_style === "creative") {
      recommendedHustles.push("graphic-design")
    }

    // Tech skills
    if (answers.skills === "tech") {
      recommendedHustles.push("web-development")
    }

    // If they have limited time, add social media management
    if (answers.time === "less-than-5" || answers.time === "5-10" || answers.time === "flexible") {
      recommendedHustles.push("social-media-management")
    }

    // Ensure we have at least 2 recommendations
    if (recommendedHustles.length < 2) {
      if (!recommendedHustles.includes("freelance-writing")) {
        recommendedHustles.push("freelance-writing")
      }
      if (!recommendedHustles.includes("social-media-management")) {
        recommendedHustles.push("social-media-management")
      }
    }

    // Save recommendations
    setRecommendedHustles(recommendedHustles)

    // Mark assessment as completed
    setAssessmentCompleted(true)

    // Award XP
    addXp(200)

    // Show toast
    toast({
      title: "Assessment completed!",
      description: "You've earned 200 XP points!",
      duration: 5000,
    })

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Show results
    setShowResults(true)
  }

  const getRecommendedHustleIcon = (id: string) => {
    switch (id) {
      case "freelance-writing":
        return <BookOpen className="h-10 w-10 text-white" />
      case "social-media-management":
        return <Briefcase className="h-10 w-10 text-white" />
      case "virtual-assistant":
        return <Clock className="h-10 w-10 text-white" />
      case "web-development":
        return <Code className="h-10 w-10 text-white" />
      case "graphic-design":
        return <Palette className="h-10 w-10 text-white" />
      case "online-tutoring":
        return <GraduationCap className="h-10 w-10 text-white" />
      case "content-creation":
        return <BookOpen className="h-10 w-10 text-white" />
      default:
        return <Trophy className="h-10 w-10 text-white" />
    }
  }

  const getHustleTitle = (id: string) => {
    switch (id) {
      case "freelance-writing":
        return "Freelance Writing"
      case "social-media-management":
        return "Social Media Management"
      case "virtual-assistant":
        return "Virtual Assistant"
      case "web-development":
        return "Web Development"
      case "graphic-design":
        return "Graphic Design"
      case "online-tutoring":
        return "Online Tutoring"
      case "content-creation":
        return "Content Creation"
      default:
        return id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
    }
  }

  const getHustleDescription = (id: string) => {
    switch (id) {
      case "freelance-writing":
        return "Create content for blogs, websites, and businesses."
      case "social-media-management":
        return "Manage social accounts for small businesses."
      case "virtual-assistant":
        return "Provide administrative support remotely."
      case "web-development":
        return "Build websites and web applications for clients."
      case "graphic-design":
        return "Create visual content for brands and businesses."
      case "online-tutoring":
        return "Teach subjects you're knowledgeable about."
      case "content-creation":
        return "Create engaging content for various platforms."
      default:
        return "Explore this exciting side hustle opportunity."
    }
  }

  if (showResults) {
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
                href="/"
                className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="/learn"
                className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
              >
                Learn
              </Link>
              <Link
                href="/assessment"
                className="text-sm font-medium text-primary-foreground border-b border-primary-foreground pb-1"
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
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm mb-8">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Trophy className="h-16 w-16 text-secondary mx-auto mb-2" />
                </div>
                <CardTitle className="text-2xl">Your Perfect Side Hustles</CardTitle>
                <CardDescription>Based on your answers, we've found the perfect side hustles for you!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center mb-6">
                  These recommendations match your skills, interests, and availability. Start learning and earning
                  today!
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {answers.recommendedHustles
                    ? JSON.parse(answers.recommendedHustles).map((hustleId: string) => (
                        <Card key={hustleId} className="border-0 shadow-sm hover:shadow-md transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                {getRecommendedHustleIcon(hustleId)}
                              </div>
                            </div>
                            <CardTitle className="text-xl">{getHustleTitle(hustleId)}</CardTitle>
                            <CardDescription>{getHustleDescription(hustleId)}</CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-primary" />
                              <span className="text-sm">Great match for your goals</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-sm">Fits your availability</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/learn/${hustleId}`} className="w-full">
                              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                                Start Learning
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))
                    : null}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/learn">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    View All Side Hustles
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
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
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-primary-foreground hover:opacity-80 transition-opacity"
            >
              Learn
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-medium text-primary-foreground border-b border-primary-foreground pb-1"
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
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Find Your Perfect Side Hustle</h1>
              <p className="text-muted-foreground">
                Answer a few questions to get personalized recommendations based on your skills, interests, and
                availability.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <Progress
                value={((currentQuestion + 1) / questions.length) * 100}
                className="h-3 bg-muted rounded-full"
                indicatorClassName="bg-secondary rounded-full"
              />
            </div>

            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <CardTitle>{questions[currentQuestion].question}</CardTitle>
                <CardDescription>{questions[currentQuestion].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleAnswer}
                  className="grid gap-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 rounded-xl border-2 p-4 cursor-pointer hover:border-primary hover:bg-primary/5"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <div className="flex flex-1 items-center">
                        <Label htmlFor={option.value} className="flex items-center cursor-pointer w-full">
                          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                            {React.cloneElement(option.icon as React.ReactElement, {
                              className: "h-5 w-5 text-white",
                            })}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                          <div className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary">
                            {answers[questions[currentQuestion].id] === option.value && (
                              <div className="h-3 w-3 rounded-full bg-secondary" />
                            )}
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="rounded-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "See Results"
                )}
              </Button>
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
