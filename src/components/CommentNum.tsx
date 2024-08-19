import { notFound } from "next/navigation";
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import type { Comment as CommentType, Likes as LikesType } from "@/types/custom";
import { fetchComments } from "@/lib/data";



export async function CommentNum({ id }: { id: string }) {
  const comments: CommentType[] = await fetchComments(id);

  if (!comments) {
    notFound();
  }

  return (
    <section >
      <button className="flex items-center gap-1"><ChatBubbleLeftIcon className="w-5 h-5" /><span>{comments.length}</span></button>
    </section>
  )
}