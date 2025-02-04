'use server'
import { LoginFormInput, SignUpInput } from '@/types/types'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const emailLogin = async (
  data: LoginFormInput,
): Promise<{ success: boolean; error: string | null }> => {
  const supabase = createClient()

  const { email, password } = data

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')

  return { success: true, error: null }
}

export const signUp = async (
  data: SignUpInput,
): Promise<{ success: boolean; error: string | null }> => {
  const supabase = createClient()

  const { email, password } = data

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    return { success: false, error: signUpError.message }
  }

  const userId = signUpData.user?.id

  if (!userId) {
    return { success: false, error: 'Error retrieving user information' }
  }

  const { error: insertError } = await supabase.from('users').insert([
    {
      email: data.email,
      id: userId,
      firstname: data.firstname,
      lastname: data.lastname,
      bio: null,
      avatar_url: data.avatarUrl,
    },
  ])

  if (insertError) {await supabase.auth.admin.deleteUser(userId);
    return { success: false, error: 'Error creating user. Please try again.' };
  }

  redirect('/dashboard/profile')

  return { success: true, error: null }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
