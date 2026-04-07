'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          display_name: displayName.trim() || undefined,
        },
      },
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        setError(error.message)
      }
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
            We&apos;ve sent a verification link to <span className="text-white font-medium">{email}</span>.
            Click the link to activate your account.
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
          Pharmacy Inventory Intelligence
        </p>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Create Account</h2>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Display Name</label>
            <Input
              type="text"
              placeholder="Dr. Smith"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
            />
          </div>

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

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Password</label>
            <Input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Confirm Password</label>
            <Input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
