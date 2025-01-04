import { CommentNum } from "@/components/CommentNum";
import CopyLinkButton from "@/components/copy";
import Speak from "@/components/speak";
import { CreateComment } from "@/components/ui/dashboard/comment";
import { fetchPost } from "@/lib/data";
import type { Post as PostType } from "@/types/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';



export default async function PostDetails({ id }: { id: string }) {
  const post: PostType | null | undefined = await fetchPost(id);
  if (!post) {
    notFound();
  }

  return (
    <main className="w-full md:w-[50%] mx-auto mt-14 md:mt-20">
      <Speak tit={post.title} content={post.content} />
      <section className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src={post?.avatar ?? undefined} alt={post.firstname!} />
          <AvatarFallback>{post.firstname?.slice(0, 1)}{post.lastname?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <p>{post.firstname} {post.lastname}</p>
      </section>
      <section className="flex gap-2 text-xs ">
        <p>Created on: {post?.created_at?.slice(0, 10)}</p>
        <p>Updated on : {post?.updated_at?.slice(0, 10)}</p>
      </section>
      <h1 className="text-center text-3xl">{post?.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} className='block mx-auto p-2 md:block md:mx-auto'>{post.content}</ReactMarkdown>
      <div className="my-2 flex gap-4 justify-center items-center">
        {/* <LikesNum id={post.id}/> */}
        <CommentNum id={post.id} />
        <CopyLinkButton />

        {/* <p className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> <span>{post.views}</span></p> */}

      </div>
      <CreateComment postId={post.id} />
    </main>
  )

}