import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'PLACEHOLDER_ANON_KEY_HERE') {
  console.error(
    "🔴 Supabase Configuration Error: API Key or URL is missing.\n" +
    "If you are seeing this in production, make sure you have added VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your deployment environment variables."
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)
