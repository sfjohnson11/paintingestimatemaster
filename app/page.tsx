import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>
}) {
  const params = await searchParams

  if (params.error) {
    const desc = params.error_description || 'An authentication error occurred'
    redirect(`/auth/error?error=${encodeURIComponent(desc)}`)
  }

  if (params.code) {
    redirect(`/auth/callback?code=${params.code}&next=/auth/payment`)
  }

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    // Check if user has an active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', data.user.id)
      .eq('status', 'active')
      .single()

    if (subscription && new Date(subscription.expires_at) > new Date()) {
      redirect('/protected')
    } else {
      redirect('/auth/payment')
    }
  } else {
    redirect('/auth/login')
  }
}
