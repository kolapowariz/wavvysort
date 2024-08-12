import { PostSkeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { fetchPost } from "@/lib/data";
import type { Post as PostType } from "@/types/custom";
import { Suspense } from "react";
import { HandThumbUpIcon, ChatBubbleLeftIcon, ArrowUpTrayIcon, EyeIcon } from '@heroicons/react/24/outline'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Speak from "@/components/speak";
import rehypeHighlight from "rehype-highlight";
import { deletePost } from "@/lib/action";



async function Post({ id }: { id: string }) {
  const post: PostType | null | undefined = await fetchPost(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  const handleDeletePost = deletePost(post.id);

  return (
    <main className="w-full md:w-[50%] mx-auto">
      <Speak tit={post.title} content={post.content} />
      <p className="text-xs">{post.user_id}</p>
      <h1 className="text-center text-3xl">{post?.title}</h1>
      <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      <p>{post?.created_at?.slice(0, 10)}</p>
      <div className="my-2 flex gap-2 justify-center items-center">
        <Button><HandThumbUpIcon className="w-5 h-5" /></Button>
        <Button><ChatBubbleLeftIcon className="w-5 h-5" /></Button>
        <Button><ArrowUpTrayIcon className="w-5 h-5" /></Button>
        <p className="flex items-center"><EyeIcon className="w-5 h-5" /> <span>: {post.views}</span></p>

      </div>
    </main>
  )

}


export default async function Page({ params }: { params: { id: string } }) {


  return (
    <Suspense fallback={<PostSkeleton />}>
      <Post id={params.id} />
    </Suspense>

  )
}