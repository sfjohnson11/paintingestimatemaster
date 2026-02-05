import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // User is not logged in - redirect to login, then come back with session_id
    const returnUrl = sessionId
      ? `/payment-success?session_id=${sessionId}`
      : '/auth/payment'
    redirect(`/auth/login?redirect=${encodeURIComponent(returnUrl)}`)
  }

  // REQUIRE a session_id from Stripe to activate subscription
  if (!sessionId) {
    redirect("/auth/payment")
  }

  // Activate subscription for this user
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: user.id,
    status: "active",
    plan: "annual",
    amount: 499,
  }, { onConflict: "user_id" })

  if (error) {
    redirect("/auth/payment?error=subscription_failed")
  }

  redirect("/protected")
}
