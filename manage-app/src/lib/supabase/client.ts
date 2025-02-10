import { createBrowserClient } from '@supabase/ssr'
import { env } from '../utils'
import { Database } from '../database.types'

export function createClient() {
  return createBrowserClient<Database>(
    env.SUPABASE_URL!,
    env.SUPABASE_KEY!
  )
}