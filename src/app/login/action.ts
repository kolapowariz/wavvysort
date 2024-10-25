'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SubmitHandler } from 'react-hook-form';
import { LoginFormInput } from '@/types/types';


export const emailLogin = async (data: LoginFormInput): Promise<{ success: boolean; error: string | null }> => {
  const supabase = createClient();

  const { email, password } = data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');

  return { success: true, error: null };
};



export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    return redirect('/signup?message=Error signing up')
  }

  const userId = signUpData.user?.id
  

  if(!userId){
    return redirect('/signup?message=Error retrieving user information')
  }

  const { error: insertError } = await supabase.from('users').insert([{ email: data.email, id: userId, firstname: data.firstname, lastname: data.lastname, bio: null, avatar_url: null }])
  

  if(insertError){
    return redirect('/signup?message=Error creating user')
  }

  return redirect('/profile')
}

export async function signOut(){
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login')
}