// 'use client';
// import { likePost } from "@/lib/action";
// import { fetchPostLikes } from "@/lib/data";
// import { useEffect, useState } from "react";

// export default function LikeButton({ userId, postId }: { userId: string, postId: string }) {
//   const [likesCount, setLikesCount] = useState<number | null>(0);

//   useEffect(() => {
//     const getLikesCount = async () => {
//       try {
//         const count = await fetchPostLikes(postId);
//         setLikesCount(count);
//       } catch (error) {
//         console.log('Error fetching likes:', error);
//       }
//     };
//     getLikesCount();
//   }, [postId]);

//   const handleLike = async () => {
//     try {
//       await likePost(userId, postId);
//       const updatedCount = await fetchPostLikes(postId);
//       setLikesCount(updatedCount);
//     } catch (error) {
//       console.log('Error liking post:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLike}>
//         Like
//       </button>
//       <span>{likesCount}</span>
//     </div>
//   )


// }

'use client';
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { likePost } from "@/lib/action";
import { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function LikePostButton({ id }: { id: string }) {

  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    const supabase = createClientComponentClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
      setError('User is not authenticated')
      return;
    }

    try {
      await likePost(user.id, id);
      setLiked(true);
    } catch (error) {
      setError('Error liking post');
    }
  }

  return (
    <button onClick={handleLike} disabled={liked} className="flex items-center gap-1"><HandThumbUpIcon className="w-5 h-5" /></button>
  )
}