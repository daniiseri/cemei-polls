'use server'

import { redirect } from "next/navigation";
import { signinSchema, SigninState } from "./definitions";
import { createClient } from "@/lib/supabase/server";

export async function signinAction(_: SigninState, formData: FormData) {
  const validatedFields = signinSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email, password } = validatedFields.data

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (error.code === 'invalid_credentials') {
        return {
          errors: {
            email: ['Credenciais inválidas']
          }
        }
      }
    }
  } catch (error) {
    console.error(error)
  }

  redirect('/new-poll')
}