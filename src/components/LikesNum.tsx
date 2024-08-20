import { notFound } from "next/navigation";
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import type { Likes as LikesType } from "@/types/custom";
import { fetchPostLikes } from "@/lib/data";
import { likePost } from "@/lib/action";
import { createClient } from "@/utils/supabase/server";

export async function LikesNum({ id }: { id: string }) {
  const likes: LikesType[] = await fetchPostLikes(id);

  if (!likes) {
    notFound();
  }

  return (
    <section  className="flex items-center gap-1">
      {/* <LikePostButton id={id} /> */}

      <button><HandThumbUpIcon className="w-5 h-5" /></button>
      <span>{likes.length}</span>
    </section>
  )
}


export async function LikePostButton ({id} : {id: string}) {
  const supabase = createClient();

  const { data: { user}} = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const like = await likePost(user.id, id);
  return (
    <button><HandThumbUpIcon className="w-5 h-5" /></button>
  )
}