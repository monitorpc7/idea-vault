import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  throw new Error('Missing or placeholder Supabase URL or anonymous key. Please update your .env file with your project credentials from your Supabase dashboard.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
