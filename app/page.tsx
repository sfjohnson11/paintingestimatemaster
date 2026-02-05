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
    redirect('/protected')
  } else {
    redirect('/auth/login')
  }
}
