import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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

        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
          <p className="text-muted-foreground">
            {"We've sent you a confirmation link. Please check your email and click the link to activate your account."}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            {"Didn't receive the email? Check your spam folder or "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              try signing up again
            </Link>
            .
          </p>
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </div>
    </div>
  )
}
