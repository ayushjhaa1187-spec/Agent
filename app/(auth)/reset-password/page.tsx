'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
            Stock<span className="text-primary">Sense</span>
          </h1>
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4 text-center">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">Check Your Email</h2>
          <p className="text-sm text-slate-400">
            If an account exists with <span className="text-white font-medium">{email}</span>,
            you&apos;ll receive a password reset link.
          </p>
          <Link href="/login">
            <Button variant="outline" className="mt-4 border-white/10 text-white hover:bg-white/5">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
          Stock<span className="text-primary">Sense</span>
        </h1>
        <p className="text-sm font-mono text-slate-500 tracking-wider uppercase">
          Password Reset
        </p>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Reset Password</h2>
        <p className="text-sm text-slate-400">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Email</label>
            <Input
              type="email"
              placeholder="pharmacist@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-bold hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Remember your password?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
