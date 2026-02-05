"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Activate subscription for this user
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: user.id,
    status: "active",
    plan: "annual",
    amount: 499,
  }, { onConflict: "user_id" })

  if (error) {
    console.error("Error creating subscription:", error)
  }

  redirect("/protected")
}
