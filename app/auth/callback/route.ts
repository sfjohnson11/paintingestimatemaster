import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { searchParams, origin } = url

  const code = searchParams.get('code')

  // Supabase may send these on failures
  const err = searchParams.get('error')
  const errCode = searchParams.get('error_code')
  const errDesc = searchParams.get('error_description')

  // Default destination after successful session exchange
  const nextRaw = searchParams.get('next') ?? '/auth/payment'

  // ✅ Prevent open redirects (only allow internal paths)
  const next = nextRaw.startsWith('/') ? nextRaw : '/auth/payment'

  // If Supabase explicitly returned an error, send to login with message
  if (err) {
    const msg = errDesc ?? `${err}${errCode ? ` (${errCode})` : ''}`
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(msg)}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    // If exchange failed, send to login with the error message (more useful than /auth/error)
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error.message)}`
    )
  }

  // No code and no explicit error = malformed callback URL
  return NextResponse.redirect(
    `${origin}/auth/login?error=${encodeURIComponent('Missing login code. Please request a new link.')}`
  )
}
