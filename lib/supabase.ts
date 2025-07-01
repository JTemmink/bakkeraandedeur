import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug logging
console.log('[DEBUG] Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('[DEBUG] Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing')
console.log('[DEBUG] Environment:', process.env.NODE_ENV)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('[SUPABASE] Missing environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 