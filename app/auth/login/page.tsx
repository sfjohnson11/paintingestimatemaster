'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Optional: /auth/login?redirect=/some/internal/path
  const redirectParam = useMemo(() => {
    const r = searchParams?.get('redirect')
    return r && r.startsWith('/') ? r : null
  }, [searchParams])

  // Optional: show message passed from /auth/callback or elsewhere
  const urlError = useMemo(() => {
    const msg = searchParams?.get('error')
    return msg ? decodeURIComponent(msg) : null
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (signInError) throw signInError
      if (!authData?.user) throw new Error('Login failed: no user returned.')

      // ✅ Authorization check (Option A): subscriptions table
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('status, expires_at')
        .eq('user_id', authData.user.id)
        .maybeSingle()

      // If the table is missing/RLS blocks/other real error, fail safely to payment
      if (subError) {
        console.error('Subscription lookup error:', subError)
        router.push('/auth/payment')
        router.refresh()
        return
      }

      const isActive =
        subscription?.status === 'active' &&
        (!subscription?.expires_at ||
          new Date(subscription.expires_at) > new Date())

      if (redirectParam) {
        router.push(redirectParam)
      } else if (isActive) {
        router.push('/protected')
      } else {
        router.push('/auth/payment')
      }

      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">
              E-Deck Estimator for Painters
            </h1>
            <p className="text-sm text-blue-700">by S F Johnson Enterprises, LLC</p>
          </div>

          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Login</CardTitle>
              <CardDescription className="text-blue-600">
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {(urlError || error) && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error ?? urlError}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-blue-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-blue-200 focus:ring-blue-500"
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-blue-800">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-blue-200 focus:ring-blue-500"
                      autoComplete="current-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-blue-700">
                  {"Don't have an account? "}
                  <Link
                    href="/auth/sign-up"
                    className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
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
