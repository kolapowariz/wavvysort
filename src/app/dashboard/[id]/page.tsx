import { CommentNum } from "@/components/CommentNum";
import CopyLinkButton from "@/components/copy";
import { PostSkeleton } from "@/components/skeleton";
import Speak from "@/components/speak";
import { CreateComment } from "@/components/ui/dashboard/comment";
import { fetchComments, fetchPost } from "@/lib/data";
import type { Comment as CommentType, Post as PostType } from "@/types/custom";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';


async function Post({ id }: { id: string }) {
  const post: PostType | null | undefined = await fetchPost(id);
  if (!post) {
    notFound();
  }

  return (
    <main className="w-full md:w-[50%] mx-auto mt-14 md:mt-20">
      <Speak tit={post.title} content={post.content} />
      <p className="text-xs">{post.user_id}</p>
      <section className="flex gap-2 text-xs ">
        <p>Created on: {post?.created_at?.slice(0, 10)}</p>
        <p>Updated on : {post?.updated_at?.slice(0, 10)}</p>
      </section>
      <h1 className="text-center text-3xl">{post?.title}</h1>
      {/* <p>{result}</p> */}
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

async function Comments({ id }: { id: string }) {
  const comments: CommentType[] = (await fetchComments(id)) || [];


  if (!comments || comments.length === 0) {
    return <p className="text-center mt-4">No comment.</p>
  }

  return (
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