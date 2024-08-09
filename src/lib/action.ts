'use server';
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export async function createPost(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }

  const header = data.content.slice(0, 500)


  if (!data.title && !data.content) {
    throw new Error('Title and content are required')
  }

  const { data: { user } } = await supabase.auth.getUser()

  
  if(!user) {
    throw new Error('User is not authenticated')
  }

  const {error} = await supabase.from('posts').insert({
    title: data.title,
    content: data.content,
    user_id: user.id,
    created_at: new Date().toUTCString(),
    id: crypto.randomUUID(),
    header: header
  })


  if (error) {
    console.log('Error inserting post:', error)
  }

  revalidatePath('/editor', 'layout')
  redirect('/dashboard')
}


// 'use server';
// import { createClient } from "@/utils/supabase/server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export async function createPost(formData: FormData) {
//   const supabase = createClient();

//   const data = {
//     title: formData.get('title') as string,
//     content: formData.get('content') as string,
//   };

//   if (!data.title || !data.content) {
//     throw new Error('Title and content are required');
//   }

//   const { data: userData, error: userError } = await supabase.auth.getUser();
//   console.log('user', userData.user);
  

//   if (userError || !userData.user || !userData.user.id) {
//     throw new Error('User is not authenticated');
//   }

//   const userId = userData.user.id;

//   // // Check if user exists in the users table
//   const { data: existingUser, error: userCheckError } = await supabase
//     .from('users')
//     .select('id')
//     .eq('id', userId)
//     .single();

//   if (userCheckError) {
//     console.log('Error checking user existence');
//     throw new Error('Error checking user existence');
//   }

//   if (!existingUser) {
//     // Insert user into users table if not exists
//     const { error: insertUserError } = await supabase.from('users').insert([
//       {
//         id: userId,
//         email: userData.user.email,
//         created_at: new Date().toISOString(),
//       },
//     ]);

//     if (insertUserError) {
//       console.log('Error inserting user', insertUserError);
//     }
//   }

//   const { error } = await supabase.from('posts').insert({
//     title: data.title,
//     content: data.content,
//     user_id: userId, // Use the authenticated user's ID
//     created_at: new Date().toISOString(),
//     id: crypto.randomUUID(), // Use crypto.randomUUID() for a valid UUID
//   });

//   if (error) {
//     console.log('Error inserting post:', error);
//     throw new Error('Error inserting post');
//   }

//   revalidatePath('/editor', 'layout');
//   redirect('/dashboard/editor');
// }