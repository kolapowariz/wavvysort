
import Search from "@/components/search";
import { DashboardSkeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { fetchFilteredPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import Link from "next/link";
import { Suspense } from "react";
import { HandThumbUpIcon, ChatBubbleLeftIcon, ArrowUpTrayIcon, EyeIcon } from '@heroicons/react/24/outline'
import Markdown from 'react-markdown'


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
  const posts = await fetchFilteredPosts(finalQuery);

  return (
    <>
      <ul>

        {posts!.map((post: Post) => (
          <li key={post.id} className=" mt-2 mb-4 border-b-2 md:w-[50%]">
            <Link href={`/dashboard/${post.id}`}>
              <p className="text-xs">{post['user_id']}</p>
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <Markdown>{post.header}</Markdown>
              <p className="text-xs">{post['created_at']?.slice(0, 10)}</p>
            </Link>
            <div className="my-2 flex gap-2 justify-center items-center">
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
