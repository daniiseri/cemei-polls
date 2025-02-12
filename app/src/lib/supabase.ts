import { createClient } from '@supabase/supabase-js'
import { env } from './utils'
import { Database } from './database.types'

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY)
