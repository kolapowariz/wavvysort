'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// export async function signup(formData: FormData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/login?message=Error signing up')
//   }

//   if (!error) {
//     const { data} = await supabase.auth.getUser();
//     const email = data.user?.email;
//     const id = data.user?.id;

//     console.log(email, id);
    

//     const { error: insertError } = await supabase.from('users').insert([{ email: email || '', id: id || '' }])
    



//     // const { email } = user
//     // const { data: newUser, error: insertError } = await supabase
//     //   .from('users')
//     //   .insert([{ email }])

//     if (insertError) {
//       redirect('/login?message=Error creating user')
//     }
//   }


//   revalidatePath('/', 'layout')
//   redirect('/login')
// }


export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    return redirect('/signup?message=Error signing up')
  }

  const userId = signUpData.user?.id
  

  if(!userId){
    return redirect('/signup?message=Error retrieving user information')
  }

  const { error: insertError } = await supabase.from('users').insert([{ email: data.email, id: userId, username: null }])
  

  if(insertError){
    return redirect('/signup?message=Error creating user')
  }

  return redirect('/login')
}

export async function signOut(){
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login')
}