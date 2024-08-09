import { createClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from "next/cache";


export async function fetchPosts() {
  noStore();
  try {
    console.log('fetching posts..');
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const supabase = createClient();
    const { data: posts, error } = await supabase.from('posts').select('*');

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
    return posts;
    
  } catch (error) {
    console.log('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchPost(slug: string) {
  try {
    console.log('Fetching single post');

    const supabase = createClient();
    const { data: post, error} = await supabase.from('posts').select('*').eq('id', slug).single();
    if (error) {
      console.log('Error fetching post:', error);
      return null;
    }
    return post;
    
  } catch (error) {
    console.log('Error fetching single post:', error);    
  }
}

export async function fetchFilteredPosts(query: string) {
  try {

    const supabase = createClient();
    
    const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', {ascending: false}).ilike('title', `%${query}%`);
    // const { data: posts, error } = await supabase.from('posts').select('*').ilike('title', `%${query}%`);
    if (error) {
      console.log('Error fetching filtered posts:', error);
      throw new Error('Failed to fetch filtered posts');
    }
    return posts;
    
  } catch (error) {
    console.log('Error fetching filtered posts:', error);
    throw new Error('Failed to fetch filtered posts');
  }
}