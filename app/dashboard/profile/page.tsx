"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, User } from "lucide-react"
import { DashboardHeader } from "@/components/sections/dashboard-header"

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  subscription_tier: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/auth/login")
        return
      }

      setUserEmail(user.email ?? "")

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (data) {
        setProfile(data)
        setFullName(data.full_name || "")
      }
      setLoading(false)
    }

    loadProfile()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    setMessage(null)

    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ 
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq("id", profile.id)

    if (error) {
      setMessage({ type: "error", text: "Failed to update profile" })
    } else {
      setMessage({ type: "success", text: "Profile updated successfully" })
    }

    setSaving(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Profile Settings"
        left={
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        }
      />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {profile?.full_name || "Your Profile"}
              </h1>
              <p className="text-muted-foreground capitalize">
                {profile?.subscription_tier || "Free"} Plan
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {message && (
              <div className={`px-4 py-3 rounded-lg text-sm ${
                message.type === "success" 
                  ? "bg-green-500/10 border border-green-500/20 text-green-500" 
                  : "bg-destructive/10 border border-destructive/20 text-destructive"
              }`}>
                {message.text}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-muted-foreground">
                {userEmail || "Not available"}
              </div>
              <p className="text-xs text-muted-foreground">
                Email cannot be changed here
              </p>
            </div>

            <div className="space-y-2">
              <Label>Subscription</Label>
              <div className="px-3 py-2 bg-background border border-border rounded-md text-foreground capitalize">
                {profile?.subscription_tier || "Free"} Plan
              </div>
              <Link href="/pricing" className="text-xs text-primary hover:underline">
                Upgrade your plan
              </Link>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Account Actions</h2>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
