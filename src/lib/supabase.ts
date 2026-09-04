import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const placeholder = (value: string | undefined) => !value || value.includes('your-project') || value.includes('your-anon-key')
export const isSupabaseConfigured = !placeholder(url) && !placeholder(key)
export const supabaseConfigError = isSupabaseConfigured ? null : 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart the server.'
export const supabase = isSupabaseConfigured ? createClient(url, key) : null
