import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nwvvyatcmntuphfpfgyh.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'PLACEHOLDER_ANON_KEY_HERE'

if (supabaseAnonKey === 'PLACEHOLDER_ANON_KEY_HERE') {
  console.error("Supabase Anon Key is missing. Please add it to your .env.local file.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
