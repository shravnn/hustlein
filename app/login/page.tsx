import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/router"

export default function LoginPage() {
  const router = useRouter()
  
  const handleLogin = (e) => {
    e.preventDefault()
    router.push("/learn")
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 font-bold text-xl text-primary-foreground"
      >
        <Trophy className="h-6 w-6" />
        <span>HustleUp.</span>
      </Link>

      <Card className="w-full max-w-md bg-white border-0 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required className="rounded-full" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
            onClick={handleLogin}
          >
            Log in
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}