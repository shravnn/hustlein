"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, XCircle, Trophy, ArrowRight, Sparkles, Brain } from "lucide-react"
import { useUser } from "@/context/user-context"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface SideHustleQuizProps {
  hustleId: string
  title: string
  onComplete: () => void
}

export function SideHustleQuiz({ hustleId, title, onComplete }: SideHustleQuizProps) {
  const { addXp, updateSideHustleProgress } = useUser()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  // Generate questions based on the hustle ID
  useEffect(() => {
    // In a real app, you'd fetch these from an API
    const quizQuestions: Record<string, Question[]> = {
      "freelance-writing": [
        {
          id: 1,
          question: "What's a key benefit of freelance writing?",
          options: ["Fixed salary", "Flexible schedule", "Company benefits", "Office space"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Which platform is commonly used by freelance writers to find work?",
          options: ["Instagram", "TikTok", "Upwork", "Snapchat"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What's an important skill for freelance writers?",
          options: ["Video editing", "Research abilities", "Coding", "Public speaking"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What type of writing typically pays the most?",
          options: ["Blog posts", "Technical writing", "Poetry", "Fiction"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What should you create to showcase your writing skills to potential clients?",
          options: ["A portfolio", "A resume only", "A business card", "A social media account"],
          correctAnswer: 0,
        },
      ],
      "social-media-management": [
        {
          id: 1,
          question: "Which tool is commonly used for scheduling social media posts?",
          options: ["Microsoft Word", "Hootsuite", "Photoshop", "Excel"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What's a key metric to track for social media success?",
          options: ["Number of posts", "Engagement rate", "Post length", "Number of hashtags"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What's the best time to post on social media?",
          options: ["Midnight", "When your audience is most active", "Early morning only", "Weekends only"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "Which platform is best for B2B marketing?",
          options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What's a social media calendar used for?",
          options: ["Tracking holidays", "Planning content in advance", "Scheduling meetings", "Tracking expenses"],
          correctAnswer: 1,
        },
      ],
      "virtual-assistant": [
        {
          id: 1,
          question: "What's a common task for virtual assistants?",
          options: ["Physical office cleaning", "Email management", "In-person meetings", "Equipment repair"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Which tool is useful for scheduling meetings as a VA?",
          options: ["Instagram", "Calendly", "TikTok", "Snapchat"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What's an important skill for virtual assistants?",
          options: ["Physical strength", "Time management", "Cooking", "Driving"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "How do most virtual assistants communicate with clients?",
          options: ["In-person meetings", "Email and video calls", "Postal mail", "Fax"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What's a benefit of being a virtual assistant?",
          options: ["Company car", "Working from anywhere", "Free lunch", "Corner office"],
          correctAnswer: 1,
        },
      ],
      "online-tutoring": [
        {
          id: 1,
          question: "What platform is commonly used for online tutoring?",
          options: ["TikTok", "Zoom", "Snapchat", "Pinterest"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What's an important quality for an online tutor?",
          options: ["Being strict", "Patience", "Speaking quickly", "Assigning lots of homework"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "How can you make online tutoring sessions more engaging?",
          options: ["Lecture for the entire time", "Use interactive tools", "No breaks", "No visuals"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What should you do before your first tutoring session?",
          options: [
            "Nothing, just wing it",
            "Prepare and plan your lesson",
            "Call the student repeatedly",
            "Send a long email",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What's a good way to track student progress?",
          options: ["Memory", "Regular assessments", "Ask parents", "Social media"],
          correctAnswer: 1,
        },
      ],
      "graphic-design": [
        {
          id: 1,
          question: "Which software is commonly used by graphic designers?",
          options: ["Microsoft Word", "Adobe Photoshop", "Excel", "Notepad"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What file format is best for logos with transparency?",
          options: ["JPG", "PNG", "BMP", "DOC"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What's an important principle in graphic design?",
          options: [
            "Using as many fonts as possible",
            "Balance",
            "Using only black and white",
            "Making text as small as possible",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What should a graphic designer create to showcase their work?",
          options: ["A resume only", "A portfolio", "A business card only", "A social media account only"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What's the color mode used for digital designs?",
          options: ["CMYK", "RGB", "HSL", "PMS"],
          correctAnswer: 1,
        },
      ],
    }

    // Set questions for the current hustle or use default questions
    setQuestions(
      quizQuestions[hustleId] || [
        {
          id: 1,
          question: "What's the best way to start this side hustle?",
          options: [
            "Quit your job immediately",
            "Start small while keeping your job",
            "Borrow money",
            "Buy expensive equipment",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "How much can beginners typically earn?",
          options: [
            "Millions right away",
            "Nothing for years",
            "Small amounts that grow with experience",
            "Exactly $1000/month",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What's a good way to find clients?",
          options: [
            "Wait for them to find you",
            "Networking and online platforms",
            "Cold calling only",
            "Newspaper ads",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "How important is having a portfolio?",
          options: ["Not important", "Very important", "Only for certain jobs", "Only after 5 years"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What's the best pricing strategy when starting out?",
          options: [
            "Charge as much as possible",
            "Work for free forever",
            "Competitive rates that reflect your experience",
            "Random prices",
          ],
          correctAnswer: 2,
        },
      ],
    )
    setLoading(false)
  }, [hustleId])

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    const correct = optionIndex === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    // Update progress
    updateSideHustleProgress(hustleId, Math.round(((currentQuestion + 1) / questions.length) * 100))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    } else {
      setShowResults(true)
      // Calculate XP based on score
      const earnedXp = Math.round((score / questions.length) * 200)
      addXp(earnedXp)

      // Show toast with earned XP
      toast({
        title: "Quiz completed!",
        description: `You earned ${earnedXp} XP points!`,
        duration: 5000,
      })

      // Trigger confetti if score is good
      if (score / questions.length >= 0.6) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-center">Loading quiz...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto border-0 shadow-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4">
            <Trophy className="h-16 w-16 text-secondary mx-auto mb-2" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress
            value={(score / questions.length) * 100}
            className="h-3 bg-muted"
            indicatorClassName="bg-secondary"
          />

          <div className="text-center py-4">
            <p className="text-lg font-medium mb-2">
              {score / questions.length >= 0.8
                ? "Amazing job! You're a natural!"
                : score / questions.length >= 0.6
                  ? "Great work! You're getting the hang of it!"
                  : "Good effort! Keep learning and try again!"}
            </p>
            <p className="text-muted-foreground">Continue learning about {title} to master this side hustle!</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={onComplete}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
          >
            Continue Learning
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-sm font-medium">Score: {score}</p>
        </div>
        <Progress
          value={(currentQuestion / questions.length) * 100}
          className="h-2 bg-muted"
          indicatorClassName="bg-secondary"
        />
        <div className="flex items-center gap-3 mt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <CardTitle>{questions[currentQuestion].question}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="grid gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
              className={cn(
                "flex items-center p-4 rounded-xl border-2 text-left transition-all",
                selectedOption === null
                  ? "hover:border-primary hover:bg-primary/5"
                  : selectedOption === index
                    ? isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : index === questions[currentQuestion].correctAnswer && selectedOption !== null
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-muted bg-background opacity-60",
              )}
            >
              <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                {selectedOption === index ? (
                  isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )
                ) : selectedOption !== null && index === questions[currentQuestion].correctAnswer ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                )}
              </div>
              <span className="font-medium">{option}</span>

              {selectedOption === index && isCorrect && (
                <Sparkles className="ml-auto h-5 w-5 text-yellow-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
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
      </CardFooter>
    </Card>
  )
}
