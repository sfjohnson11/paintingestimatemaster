import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">E-Deck Estimator</h1>
            <p className="text-sm text-blue-700">by S F Johnson Enterprises, LLC</p>
          </div>
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">
                Thank you for signing up!
              </CardTitle>
              <CardDescription className="text-blue-600">
                Check your email to confirm your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                {"You've successfully signed up. Please check your email to confirm your account. Once confirmed, you'll be directed to complete your payment to access the E-Deck Painting Estimator."}
              </p>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Annual Subscription: $499/year</p>
                <p className="text-xs text-blue-600 mt-1">After confirming your email, you will be redirected to complete payment.</p>
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-blue-600">
            &copy; 2025 E-Deck Estimator by S F Johnson Enterprises, LLC
          </p>
        </div>
      </div>
    </div>
  )
}
