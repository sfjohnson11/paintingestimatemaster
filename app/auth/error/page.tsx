import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">E-Deck Estimator</h1>
            <p className="text-sm text-blue-700">by S F Johnson Enterprises, LLC</p>
          </div>
          <Card className="border-red-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-red-700">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-red-600 mb-4">
                  Error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-red-600 mb-4">
                  An unspecified error occurred.
                </p>
              )}
              <Link href="/auth/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
