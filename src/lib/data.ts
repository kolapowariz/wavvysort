import { createClient } from '@/utils/supabase/server'

export async function fetchPost(slug: string) {
  try {
    const supabase = createClient()
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', slug)
      .single()
    if (error) {
      console.log('Error fetching post')
    }
    return post
  } catch (error) {
    console.log('Error fetching single post:', error)
  }
}

export async function fetchFilteredPosts(query: string) {
  try {
    const supabase = createClient()

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .ilike('title', `%${query}%`)
    if (error) {
      console.log('Error fetching post')
    }
    return posts
  } catch (error) {
    console.log('Error fetching filtered posts:', error)
  }
}

export async function fetchDesendingPosts() {
  try {
    const supabase = createClient()
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(3)
    if (error) {
      console.log('Error fetching post')
    }
    return posts
  } catch (error) {
    console.log('Error fetching posts:', error)
  }
}

export async function fetchUserProfile(userId: string) {
  try {
    const supabase = createClient()
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)

    if (error) {
      console.log('Error fetching user profile:', error)
    }

    return user
  } catch (error) {
    console.log('Error fetching user profile:', error)
  }
}

export async function fetchPostLikes(postId: string) {
  try {
    const supabase = createClient()
    const { data: likes, error } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)

    if (error) {
      console.log('Error fetching post likes:', error.message)
    }

    return likes
  } catch (error) {
    console.log('Error fetching post likes:', error)
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    const supabase = createClient()
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.log('Error fetching user posts:', error)
    }

    return posts
  } catch (error) {
    console.log('Error fetching user posts:', error)
  }
}

export async function fetchComments(postId: string) {
  try {
    const supabase = createClient()
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) {
      console.log('Error fetching comments:', error)
    }

    return comments
  } catch (error) {
    console.log('Error fetching comments:', error)
  }
}
