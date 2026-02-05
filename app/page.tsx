import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const params = await searchParams

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
