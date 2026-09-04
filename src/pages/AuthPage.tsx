import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '../components/ui'
import { supabase } from '../lib/supabase'

export function AuthPage() {
  const [isSignup, setIsSignup] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!supabase) { setMessage('Supabase is not configured. Add the required environment variables and restart the app.'); return }
    setBusy(true); setMessage('')
    try {
      const response = isSignup
        ? await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } })
        : await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (response.error) { setMessage(authMessage(response.error.message, isSignup)); return }
      if (isSignup && !response.data.session) setMessage('Account created. Check your email to confirm it, then return here and sign in.')
    } catch { setMessage('We could not reach Supabase. Check your connection and try again.') } finally { setBusy(false) }
  }
  return <div className="auth-page"><div className="auth-intro"><span className="brand-mark">P</span><h1>Move toward your next opportunity with clarity.</h1><p>One private workspace for your academics, preparation, and daily progress.</p></div><div className="auth-panel"><Link to="/login" className="brand"><span className="brand-mark">P</span>PlacementPilot</Link><h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2><p className="subtext">{isSignup ? 'Start with the foundation. Add only what is true for you.' : 'Sign in to continue your placement preparation.'}</p><form onSubmit={submit}><label>Email<Input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label><label>Password<Input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete={isSignup ? 'new-password' : 'current-password'} /></label>{message && <p className="form-message">{message}</p>}<Button disabled={busy}>{busy ? 'Please wait…' : isSignup ? 'Create account' : 'Sign in'}</Button></form><p className="switch">{isSignup ? 'Already have an account?' : 'New to PlacementPilot?'} <button onClick={() => { setIsSignup(!isSignup); setMessage('') }}>{isSignup ? 'Sign in' : 'Create one'}</button></p></div></div>
}
function authMessage(message: string, signingUp: boolean) {
  const text = message.toLowerCase()
  if (text.includes('invalid login credentials')) return 'Email or password is incorrect.'
  if (text.includes('email not confirmed')) return 'Please confirm your email before signing in.'
  if (text.includes('already registered') || text.includes('already been registered')) return 'An account with this email already exists. Try signing in instead.'
  if (text.includes('database error')) return signingUp ? 'We could not create your account profile. Please try again or contact support.' : 'Authentication is temporarily unavailable. Please try again.'
  return message
}
