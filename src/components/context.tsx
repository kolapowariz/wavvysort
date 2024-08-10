'use client'
import { Post } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { createContext, useState } from "react";

export const DataContext = createContext<any>(null);



import { ReactNode } from "react";

export default async function DataProvider({children}: { children: ReactNode }) {
  const [posting, setPosting] = useState<Post[] | null>()
  const [loading, setLoading] = useState(true);
  try {
    console.log('fetching posts..');
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const supabase = createClient();
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (Array.isArray(posts)){
      setPosting(posts)
      setLoading(false)
    } else {
      console.log('Data is not an array');
      
    }

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
    
  } catch (error) {
    console.log('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  if(loading){
    return <div>Loading...</div>
  }
  return(
    <DataContext.Provider value={posting}>
      {children}
    </DataContext.Provider>
  )
}