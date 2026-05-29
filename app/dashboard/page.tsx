import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Clock, 
  Award,
  ArrowRight,
  Play,
  Settings,
  LogOut
} from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"

async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
  return data
}

async function getTutorialProgress(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("tutorial_progress")
    .select("*, tutorials(*)")
    .eq("user_id", userId)
    .order("last_watched_at", { ascending: false })
    .limit(5)
  return data || []
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getProfile(user.id)
  const recentProgress = await getTutorialProgress(user.id)

  const subscriptionLabel = {
    free: "Free",
    individual: "Individual",
    business: "Business",
    corporate: "Corporate"
  }[profile?.subscription_tier || "free"]

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-minimal_9e6fa51e-UaMf38Ojdi15BYKPAH4926MB2FocKR.png"
              alt="Tech with Brands"
              width={40}
              height={40}
            />
            <span className="font-semibold text-foreground">Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/profile" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground">
            Continue your AI learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{recentProgress.length}</p>
                <p className="text-sm text-muted-foreground">Courses Started</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {recentProgress.filter(p => p.completed).length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{subscriptionLabel}</p>
                <p className="text-sm text-muted-foreground">Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
                <Link href="/academy" className="text-primary hover:underline text-sm flex items-center gap-1">
                  View all courses <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentProgress.length > 0 ? (
                <div className="space-y-4">
                  {recentProgress.map((progress) => (
                    <div key={progress.id} className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Play className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {progress.tutorials?.title || "Tutorial"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${progress.progress_percent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {progress.progress_percent}%
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">No courses started yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Browse our AI Academy and start learning today
                  </p>
                  <Button asChild>
                    <Link href="/academy">Explore Courses</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/academy">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/services">
                    <Award className="h-4 w-4 mr-2" />
                    Book Training
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
              </div>
            </div>

            {profile?.subscription_tier === "free" && (
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">Upgrade Your Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get access to premium courses and resources
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is here to support your learning journey
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I need help with my AI Academy account`} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
