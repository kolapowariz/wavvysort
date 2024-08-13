'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }

  const header = data.content.slice(0, 100)

  if (!data.title && !data.content) {
    throw new Error('Title and content are required')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const { error } = await supabase.from('posts').insert({
    title: data.title,
    content: data.content,
    user_id: user.id,
    created_at: new Date().toUTCString(),
    id: crypto.randomUUID(),
    header: header,
  })

  if (error) {
    console.log('Error inserting post:', error)
  }

  revalidatePath('/editor', 'layout')
  redirect('/dashboard')
}

export async function likePost(userId: string, postId: string) {
  const supabase = createClient()

  try {
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes')
      .select()
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error('Error checking like status: ' + fetchError.message)
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId)

      if (deleteError) {
        throw new Error('Error deleting like:' + deleteError.message)
      }
    } else {
      const { error: insertError } = await supabase
        .from('likes')
        .insert([{ user_id: userId, post_id: postId }])

      if (insertError) {
        throw new Error('Error inserting like' + insertError.message)
      }
    }
  } catch (error) {
    console.error('Error liking post:', error)
  }
}

export async function deletePost(postId: string) {
  const supabase = createClient()

  try {    
    const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    
    if (deleteError) {
      throw new Error('Error deleting post try action: ' + deleteError.message)
    }
    revalidatePath('/dashboard/')
    redirect('/dashboard')
  } catch (error) {
    console.error('Error deleting post catch action:', error)
  }
}
