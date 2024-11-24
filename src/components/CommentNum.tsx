import { fetchComments } from "@/lib/data";
import type { Comment as CommentType } from "@/types/custom";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export async function CommentNum({ id }: { id: string }) {
  const comments: CommentType[] = (await fetchComments(id)) || [];

  if (!comments || comments.length === 0) {
    return <button className="flex items-center gap-1"><ChatBubbleLeftIcon className="w-5 h-5" /><span>0</span></button>;
  }

  return (
    <section >
      <button className="flex items-center gap-1"><ChatBubbleLeftIcon className="w-5 h-5" /><span>{comments.length}</span></button>
    </section>
  )
}