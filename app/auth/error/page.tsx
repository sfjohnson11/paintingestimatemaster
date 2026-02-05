import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorMessage = params?.error || 'An unspecified error occurred.'
  const isExpired = errorMessage.toLowerCase().includes('expired')

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">E-Deck Estimator for Painters</h1>
            <p className="text-sm text-blue-700">by S F Johnson Enterprises, LLC</p>
          </div>
          <Card className="border-red-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-red-700">
                {isExpired ? 'Link Expired' : 'Something went wrong'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-red-600">
                {isExpired
                  ? 'Your confirmation link has expired. Please sign up again or log in if you already confirmed your account.'
                  : errorMessage}
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/auth/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Back to Login
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button variant="outline" className="w-full bg-transparent border-blue-300 text-blue-700 hover:bg-blue-50">
                    Sign Up Again
                  </Button>
                </Link>
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
