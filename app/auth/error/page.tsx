import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <Link href="/" className="inline-block">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-standard_47d40bb8-6NJYG5qo3bpU4a7BuqIbbg2yTJBGVj.png"
            alt="Tech with Brands"
            width={100}
            height={100}
            className="mx-auto"
          />
        </Link>

        <div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong during authentication. This could be due to an expired link or invalid credentials.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/auth/login">Try logging in again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
