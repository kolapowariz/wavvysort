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
import { LikesNum } from "@/components/LikesNum";
import { CommentNum } from "@/components/CommentNum";
import CopyLinkButton from "@/components/copy";
import ReactMarkdown from "react-markdown";
import Image from "next/image";


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
      <ul className="md:grid md:grid-cols-2 md:w-[100%]">

        {posts.map((post: Post) => (
          <li key={post.id} className="md:w-[95%] mt-2 mb-4 border-b-2">
            <Link href={`/dashboard/${post.id}`}>
              <p className="text-xs">{post.email}</p>
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <section className="md:flex gap-2">
                <img src={`${post.image}`} className="w-full md:w-52 h-32 mx-auto md:mx-0 " />
                {/* <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} className=''>{post.header}</ReactMarkdown> */}
                <p className="">{post.header?.split('')}</p>

              </section>
              
              <p className="text-xs mt-2">{post['created_at']?.slice(0, 10)}</p>
            </Link>
            <div className="my-2 flex gap-4 justify-center items-center">
              {/* <LikesNum id={post.id} /> */}
              <Link href={`/dashboard/${post.id}#comments`}>
                <CommentNum id={post.id} />

              </Link>
              <CopyLinkButton />
              {/* <p className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> <span>{post.views}</span></p> */}
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
