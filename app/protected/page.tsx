import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProtectedEstimator from './protected-estimator'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  // Check if user has an active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', data.user.id)
    .eq('status', 'active')
    .single()

  if (!subscription) {
    redirect('/auth/payment')
  }

  // Check if subscription has expired
  if (new Date(subscription.expires_at) < new Date()) {
    redirect('/auth/payment')
  }

  return <ProtectedEstimator userEmail={data.user.email || ''} />
}
