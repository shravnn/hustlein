import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, BookOpen, ArrowRight, Clock, DollarSign, Briefcase } from "lucide-react"
import { SideHustleCard } from "@/components/side-hustle-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <header className="w-full py-4">
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
          <Link href="/signup">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
              Get started
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-foreground">
                    Turn Your Skills Into Income
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Learn, practice, and master side hustles through our gamified platform. Level up your income
                    potential one skill at a time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/assessment">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 rounded-full"
                    >
                      Take Assessment
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-full bg-white/20 p-8">
                  <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-secondary"></div>
                  <div className="absolute right-10 top-1/3 rounded-full bg-white p-3 px-6">
                    <span className="font-medium text-primary-foreground">Freelancing</span>
                  </div>
                  <div className="absolute right-20 top-1/2 rounded-full bg-secondary p-3 px-6">
                    <span className="font-medium text-secondary-foreground">SoMe</span>
                  </div>
                  <div className="absolute right-10 bottom-1/3 rounded-full bg-white p-3 px-6">
                    <span className="font-medium text-primary-foreground">Tutoring</span>
                  </div>
                  <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full border-4 border-dotted border-white/40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-foreground">
                  Popular Side Hustles
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Discover side hustles that match your skills and schedule. Unlock more as you level up.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 md:grid-cols-3">
              <SideHustleCard
                title="Freelance Writing"
                description="Create content for blogs, websites, and businesses."
                level={1}
                earnings="$15-50/hr"
                timeCommitment="Flexible"
                icon={<BookOpen className="h-10 w-10 text-primary-foreground" />}
                unlocked={true}
              />
              <SideHustleCard
                title="Social Media Management"
                description="Manage social accounts for small businesses."
                level={2}
                earnings="$20-35/hr"
                timeCommitment="10-15 hrs/week"
                icon={<Briefcase className="h-10 w-10 text-primary-foreground" />}
                unlocked={true}
              />
              <SideHustleCard
                title="Web Development"
                description="Build websites and web applications for clients."
                level={4}
                earnings="$25-75/hr"
                timeCommitment="Project-based"
                icon={<DollarSign className="h-10 w-10 text-primary-foreground" />}
                unlocked={false}
              />
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/learn">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary text-primary-foreground hover:bg-primary/10"
                >
                  View All Side Hustles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-foreground">
                  How It Works
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Our gamified approach makes learning side hustles fun and effective.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-center gap-8 py-6 md:grid-cols-4">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <CardTitle className="text-xl">Take Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discover which side hustles match your skills and availability.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <CardTitle className="text-xl">Learn Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Access comprehensive lessons for each side hustle.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <CardTitle className="text-xl">Complete Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Test your knowledge with interactive quizzes.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <CardTitle className="text-xl">Apply & Level Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Apply skills in real life and unlock new side hustles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-foreground">
                    Find Your Perfect Side Hustle
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    Not sure where to start? Our assessment helps you find side hustles that match your skills,
                    interests, and availability.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="/assessment">
                    <Button
                      size="lg"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
                    >
                      Take Assessment
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-primary text-primary-foreground hover:bg-primary/10"
                    >
                      Browse All Side Hustles
                    </Button>
                  </Link>
                </div>
              </div>
              <Card className="bg-white border border-muted shadow-sm">
                <CardHeader>
                  <CardTitle>Assessment Preview</CardTitle>
                  <CardDescription>Answer a few questions to get personalized recommendations</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">How much time can you commit weekly?</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start rounded-full">
                        <Clock className="mr-2 h-4 w-4" />
                        5-10 hours
                      </Button>
                      <Button variant="outline" className="justify-start rounded-full">
                        <Clock className="mr-2 h-4 w-4" />
                        10-20 hours
                      </Button>
                      <Button variant="outline" className="justify-start rounded-full">
                        <Clock className="mr-2 h-4 w-4" />
                        20+ hours
                      </Button>
                      <Button variant="outline" className="justify-start rounded-full">
                        <Clock className="mr-2 h-4 w-4" />
                        Flexible
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                    Start Full Assessment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-primary">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-primary-foreground/70">
              <span className="text-lg font-medium">Google</span>
              <span className="text-lg font-medium">Airbnb</span>
              <span className="text-lg font-medium">Ebay</span>
              <span className="text-lg font-medium">Uizard</span>
              <span className="text-lg font-medium">Notion</span>
            </div>
          </div>
        </section>
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
