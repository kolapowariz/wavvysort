import { fetchComments } from "@/lib/data";
import type { Comment as CommentType } from "@/types/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Comments({ id }: { id: string }) {
  const comments: CommentType[] = (await fetchComments(id)) || [];


  if (!comments || comments.length === 0) {
    return <p className="text-center mt-4">No comment.</p>
  }

  return (
    <section className="w-full md:w-[50%] mx-auto">
      {comments.map((comment) => (
        <div key={comment.id} className="mt-2 border-b-2">
          <section className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={comment?.avatar ?? undefined} alt={comment.firstname!} />
              <AvatarFallback>{comment.firstname?.slice(0, 1)}{comment.lastname?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p>{comment.firstname} {comment.lastname}</p>
          </section>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  )
}