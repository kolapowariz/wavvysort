import Search from "@/components/search";
import { DashboardSkeleton } from "@/components/skeleton";
import { fetchFilteredPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import Link from "next/link";
import { Suspense } from "react";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { HandThumbUpIcon, ChatBubbleLeftIcon, ArrowUpTrayIcon, EyeIcon } from '@heroicons/react/24/outline'


async function Posts({
  searchParams,
  query,
}: {
  searchParams?: {
    query?: string;
  };
  query?: string;
}) {
  const finalQuery = query || (searchParams?.query || '');
  const posts: Post[] = await fetchFilteredPosts(finalQuery) as Post[];
  if (!posts) {
    notFound();
  }
  return (
    <>
      <ul>

        {posts.map((post: Post) => (
          <li key={post.id} className=" mt-2 mb-4 border-b-2 md:w-[50%]">
            <Link href={`/dashboard/${post.id}`}>
              <p className="text-xs">{post['user_id']}</p>
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{post.header}</Markdown>
              <p className="text-xs">{post['created_at']?.slice(0, 10)}</p>
            </Link>
            <div className="my-2 flex gap-4 justify-center items-center">
              <button><HandThumbUpIcon className="w-5 h-5" /></button>
              <button><ChatBubbleLeftIcon className="w-5 h-5" /></button>
              <button><ArrowUpTrayIcon className="w-5 h-5" /></button>
              <p className="flex items-center"><EyeIcon className="w-5 h-5" /> <span>: {post.views}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Dashboard({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  return (
    <>
      <Search placeholder="search" />
      <Suspense key={query} fallback={<DashboardSkeleton />}>
        <Posts searchParams={searchParams} query={query} />
      </Suspense>
    </>
  )
}
