'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { fetchUserProfile } from './data'

const FormSchema = z.object({
  title: z.string(),
  content: z.string(),
})

const ProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
  // avatar_url: z.string(),
})

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  try {
    const data = ProfileSchema.parse({
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      bio: formData.get('bio'),
      // avatar_url: formData.get('avatar_url'),
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User is not authenticated')
    }

    if (
      data.firstname === null ||
      data.firstname === undefined ||
      data.firstname === '' ||
      data.lastname === null ||
      data.lastname === undefined ||
      data.lastname === '' ||
      data.bio === null ||
      data.bio === undefined ||
      data.bio === ''
    ) {
      throw new Error('Firstname, Lastname and bio are required')
    }

    const { error } = await supabase
      .from('users')
      .update({
        firstname: data.firstname,
        lastname: data.lastname,
        bio: data.bio,
        avatar_url:
          'https://htwijjddwzuxqslqxkmw.supabase.co/storage/v1/object/public/profiles/IMG_4694-2.JPG',
        id: user.id,
        email: user.email,
        created_at: new Date().toUTCString(),
        updated_at: new Date().toUTCString(),
      })
      .eq('id', user.id)
      .eq('email', user.email ?? '')

    if (error) {
      console.log('Error updating profile:', error)
    }

    console.log('Profile updated successfully')

    // revalidatePath('/dashboard/profile')
  } catch (error) {
    console.log('Error fetching user:', error)
  }
}

export async function createPost(formData: FormData) {
  const supabase = createClient()

  const data = FormSchema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  const oldHeader = data.content
  const start = ']('
  const end = ')'

  const image = oldHeader
    .split(start)
    .map((item) => {
      if (item.includes(end)) {
        return item.split(end)[0]
      }
    })
    .filter((item) => item !== undefined)
    .join(' ')

  const header = data.content.slice(0, 50)

  if (
    data.title === null ||
    data.title === undefined ||
    (data.title === '' && data.content === null) ||
    data.content === undefined ||
    data.content === ''
  ) {
    throw new Error('Title and content are required')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const profile = await fetchUserProfile(user.id)
  const { firstname, lastname, avatar_url } = profile![0]

  const { error } = await supabase.from('posts').insert({
    title: data.title,
    content: data.content,
    user_id: user.id,
    created_at: new Date().toUTCString(),
    id: crypto.randomUUID(),
    header: header,
    email: user?.email,
    updated_at: new Date().toUTCString(),
    image: image,
    firstname,
    lastname,
    avatar: avatar_url,
  })

  if (error) {
    console.log('Error inserting post:', error)
  }

  revalidatePath('/editor', 'layout')
  redirect('/dashboard')
}

export async function likePost(userId: string, postId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

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
      throw new Error('Error deleting post try action')
    }
    revalidatePath('/dashboard/')
    redirect('/dashboard')
  } catch (error) {
    console.error('Error deleting post catch action', error)
  }
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = createClient()

  const data = FormSchema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  const oldHeader = data.content
  const start = ']('
  const end = ')'
  const image = oldHeader
    .split(start)
    .map((item) => {
      if (item.includes(end)) {
        return item.split(end)[0]
      }
    })
    .filter((item) => item !== undefined)
    .join(' ')

  const header = data.content.slice(0, 50)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    data.title === null ||
    data.title === undefined ||
    (data.title === '' && data.content === null) ||
    data.content === undefined ||
    data.content === ''
  ) {
    throw new Error('Title and content are required')
  }

  try {
    const { error } = await supabase
      .from('posts')
      .update({
        title: data.title,
        content: data.content,
        header: header,
        email: user?.email,
        updated_at: new Date().toUTCString(),
        image: image,
      })
      .eq('id', postId)
      .eq('email', user?.email ?? '')

    if (error) {
      console.log('Error updating post:', error)
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }

  revalidatePath('/editor', 'layout')
  redirect('/dashboard/profile')
}

const commentSchema = z.object({
  comment: z.string(),
})

export async function createComment(postId: string, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const data = commentSchema.parse({
    comment: formData.get('comment'),
  })

  if (
    data.comment === null ||
    data.comment === undefined ||
    data.comment === ''
  ) {
    throw new Error('Comment is required')
  }

  try {
    const profile = await fetchUserProfile(user.id)
    const { firstname, lastname, avatar_url } = profile![0]

    const { error } = await supabase.from('comments').insert([
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        post_id: postId,
        content: data.comment,
        firstname,
        lastname,
        avatar: avatar_url,
        created_at: new Date().toUTCString(),
      },
    ])

    if (error) {
      console.error('Error inserting comment:', error)
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }

  revalidatePath(`/dashboard/${postId}`)
  redirect(`/dashboard/${postId}`)
}
