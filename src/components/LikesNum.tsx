import { notFound } from "next/navigation";
import type { Likes as LikesType } from "@/types/custom";
import { fetchPostLikes } from "@/lib/data";
import { LikePostButton } from "./likeButton";

export async function LikesNum({ id }: { id: string }) {
  const likes: LikesType[] = await fetchPostLikes(id) || [];

  if (!likes) {
    notFound();
  }

  return (
    <section  className="flex justify-center items-center gap-1">
      <LikePostButton id={id} />

      {/* <button><HandThumbUpIcon className="w-5 h-5" /></button> */}
      <span>{likes.length}</span>
    </section>
  )
}


