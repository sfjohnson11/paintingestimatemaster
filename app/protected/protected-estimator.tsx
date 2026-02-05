'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import PaintingEstimateForm from '@/painting-estimate-form'

interface ProtectedEstimatorProps {
  userEmail: string
}

export default function ProtectedEstimator({ userEmail }: ProtectedEstimatorProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-blue-900 text-white px-4 py-2 print:hidden">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">E-Deck Estimator for Painters</span>
          <span className="text-xs text-blue-300">{userEmail}</span>
        </div>
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="text-white hover:bg-blue-800 bg-transparent flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <PaintingEstimateForm />
    </div>
  )
}
