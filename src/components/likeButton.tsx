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