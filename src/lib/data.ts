import { createClient } from "@/utils/supabase/server";

export async function fetchPost(slug: string) {
  try {
    const supabase = createClient();
    const { data: post, error} = await supabase.from('posts').select('*').eq('id', slug).single();
    if (error) {
      throw new Error('Error fetching post');
    }
    return post;
    
  } catch (error) {
    console.log('Error fetching single post:', error);
    // throw new Error('Error fetching post');
  }
}

export async function fetchFilteredPosts(query: string) {
  try {

    const supabase = createClient();
    
    const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', {ascending: false}).ilike('title', `%${query}%`);
    // const { data: posts, error } = await supabase.from('posts').select('*').ilike('title', `%${query}%`);
    if (error) {
      throw new Error('Error fetching posts');
    }
    return posts;
    
  } catch (error) {
    console.log('Error fetching filtered posts:', error);
    throw new Error('Error fetching posts');
  }
}

export async function fetchPostLikes(postId: string) {
  try {
    const supabase = createClient();
    const { data: likes, error } = await supabase
      .from('likes')
      .select('post_id', { count: 'exact' })
      .eq('post_id', postId)

    if (error) {
      console.log('Error fetching post likes:', error.message);
      throw new Error('Error fetching post likes');
    }

    return likes?.length || 0;
  } catch (error) {
    console.log('Error fetching post likes:', error);
    throw new Error('Error fetching post likes');
  }
}


export async function fetchUserPosts(userId: string) {
  try {
    const supabase = createClient();
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error fetching user posts:', error);
      throw new Error('Error fetching user posts');
    }

    return posts;
  } catch (error) {
    console.log('Error fetching user posts:', error);
    throw new Error('Error fetching user posts');
  }
}