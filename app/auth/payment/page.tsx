'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/dRmfZh1yacUp1os2Ba6J31B'

export default function PaymentPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser({ email: user.email || '' })
      setIsLoading(false)
    }
    checkUser()
  }, [router])

  const handlePayment = () => {
    // Redirect to Stripe payment link with prefilled email and success redirect
    const successUrl = `${window.location.origin}/auth/payment/success`
    const paymentUrl = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(user?.email || '')}`
    window.location.href = paymentUrl
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-blue-50">
        <p className="text-blue-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-blue-50">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">E-Deck Estimator</h1>
            <p className="text-sm text-blue-700">by S F Johnson Enterprises, LLC</p>
          </div>
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Complete Your Subscription</CardTitle>
              <CardDescription className="text-blue-600">
                Unlock full access to the E-Deck Painting Estimator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-blue-900">$499</span>
                  <span className="text-blue-600">/year</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Lightning-fast estimates in minutes, not hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Accurate manhours based on industry standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Automatic calculations for labor and materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Customizable pricing and profit margins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Professional-looking estimate reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Data visualization and cost breakdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-blue-800">Photo upload for project documentation</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
              >
                Subscribe Now - $499/year
              </Button>

              <p className="text-xs text-center text-blue-500 mt-4">
                Secure payment powered by Stripe. Cancel anytime.
              </p>

              <div className="mt-4 pt-4 border-t border-blue-100">
                <p className="text-xs text-center text-blue-500">
                  Already paid? Click below to verify and activate your access.
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push('/payment-success')}
                  className="w-full mt-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  I've Already Paid - Activate Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-blue-600">
            &copy; 2026 E-Deck Estimator by S F Johnson Enterprises, LLC
          </p>
        </div>
      </div>
    </div>
  )
}
