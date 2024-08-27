import { EyeIcon } from 'lucide-react';
import { useEffect } from 'react';

async function incrementViewCount(postId: string) {
  try {
    const response = await fetch(`/api/posts/${postId}/view`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to update view count');
    }
  } catch (error) {
    console.error('Error updating view count:', error);
  }
}



export function IncrementView({ postId, post }: { postId: string, post: { views: number } }) {
  useEffect(() => {
    incrementViewCount(postId);
  }, [postId]);

  return (
    <p className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> <span>{post.views}</span></p>
  );
}