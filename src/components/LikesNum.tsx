import { notFound } from "next/navigation";
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import type { Likes as LikesType } from "@/types/custom";
import { fetchPostLikes } from "@/lib/data";


export async function LikesNum({ id }: { id: string }) {
  const likes: LikesType[] = await fetchPostLikes(id);

  if (!likes) {
    notFound();
  }

  return (
    <section >
      <button className="flex items-center gap-1"><HandThumbUpIcon className="w-5 h-5" /><span>{likes.length}</span></button>
    </section>
  )
}