"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // User is not logged in - redirect to login, then they'll come back after
    redirect(`/auth/login?redirect=/payment-success${sessionId ? `?session_id=${sessionId}` : ''}`)
  }

  // Activate subscription for this user
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: user.id,
    status: "active",
    plan: "annual",
    amount: 499,
  }, { onConflict: "user_id" })

  if (error) {
    console.error("[v0] Error creating subscription:", error)
    redirect("/auth/payment?error=subscription_failed")
  }

  redirect("/protected")
}
