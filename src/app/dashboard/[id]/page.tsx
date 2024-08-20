import { PostSkeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { fetchComments, fetchPost } from "@/lib/data";
import type { Post as PostType, Comment as CommentType } from "@/types/custom";
import { Suspense } from "react";
import { HandThumbUpIcon, ChatBubbleLeftIcon, ArrowUpTrayIcon, EyeIcon } from '@heroicons/react/24/outline'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Speak from "@/components/speak";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { CreateComment } from "@/components/ui/dashboard/comment";
import { LikesNum } from "@/components/LikesNum";
import { CommentNum } from "@/components/CommentNum";
import ReactMarkdown from 'react-markdown';





async function Post({ id }: { id: string }) {
  const post: PostType | null | undefined = await fetchPost(id);
  if (!post) {
    notFound();
  }

  return (
    <main className="w-full md:w-[50%] mx-auto">
      <Speak tit={post.title} content={post.content} />
      <p className="text-xs">{post.user_id}</p>
      <section className="flex gap-2 text-xs ">
        <p>Created on: {post?.created_at?.slice(0, 10)}</p>
        <p>Updated on : {post?.updated_at?.slice(0, 10)}</p>
      </section>
      <h1 className="text-center text-3xl">{post?.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}
      components={{
        img: ({ node, ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...props}
            alt={props.alt || 'Image'} 
            style={{ maxWidth: '100%' }} 
          />
        ),
      }}
      >{post.content}</ReactMarkdown>
      <div className="my-2 flex gap-4 justify-center items-center">
        <LikesNum id={post.id}/>
        <CommentNum id={post.id} />
        <button><ArrowUpTrayIcon className="w-5 h-5" /></button>
        <p className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> <span>{post.views}</span></p>
      </div>
      <CreateComment postId={post.id} />
    </main>
  )

}

async function Comments ({id} : {id: string}) {
  const comments: CommentType[] = await fetchComments(id);


  if(!comments){
    notFound();
  }

  return(
    <section className="w-full md:w-[50%] mx-auto">
      {comments.map((comment) => (
        <div key={comment.id} className="mt-2 border-b-2">
          <p className="text-xs">{comment.user_id}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  )
}


export default async function Page({ params }: { params: { id: string } }) {

  return (
    <Suspense fallback={<PostSkeleton />}>
      <Post id={params.id} />
      <Comments id={params.id} />
    </Suspense>
  )
}