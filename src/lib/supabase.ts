
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Check your .env file.')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

export type UserProfile = {
  id: string
  email: string
  name?: string | null
  age?: number | null
  height?: number | null
  weight?: number | null
  gender?: 'male' | 'female' | 'other' | null
  intensity?: 'beginner' | 'medium' | 'hard' | null
  frequency?: number | null
  target_weight?: number | null
  goal?: 'weight_loss' | 'weight_gain' | 'maintain' | null
  created_at: string
  updated_at: string
}

export type HealthTip = {
  id: number
  title: string
  description: string
  category: string
}
