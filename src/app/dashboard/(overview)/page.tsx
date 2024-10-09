import Search from "@/components/search";
import { DashboardSkeleton, DescendingPostsSkeleton } from "@/components/skeleton";
import { fetchDesendingPosts, fetchFilteredPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LikesNum } from "@/components/LikesNum";
import { CommentNum } from "@/components/CommentNum";
import CopyLinkButton from "@/components/copy";
import Image from "next/image";


async function DesendingPosts() {
  const posts = await fetchDesendingPosts() as Post[];
  if (!posts) {
    notFound();
  }

  return (
    <ul className="hidden xl:block">
      {posts.map((post: Post) => (
        <li key={post.id} className="my-4 p-2 py-4">
          <Link href={`/dashboard/${post.id}`}>
            <Image src={`${post.image}`} width={300} height={300} className="w-full md:w-52 h-32 mx-auto md:mx-0 rounded-md " alt="Uplaoded Image" />
            <h2>{post.title}</h2>
            <p>{post.header?.slice(0, 30)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

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
      <ul className="md:border md:rounded-md p-4">

        {posts.map((post: Post) => (
          <li key={post.id} className="md:w-[100%] mt-2 mb-4 mx-auto border-b-2">
            <Link href={`/dashboard/${post.id}`}>
              <p className="text-xs">{post.user_id}</p>
              <h2 className="text-lg md:text-xl font-bold">{post.title}</h2>
              <section className="md:flex gap-2">
                <Image src={`${post.image}`} width={300} height={300} className="w-full md:w-52 h-32 mx-auto md:mx-0 rounded-md " alt="Uplaoded Image" />
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
      <div className="flex justify-center gap-10">
        <Suspense key={query} fallback={<DashboardSkeleton />}>
          <Posts searchParams={searchParams} query={query} />
        </Suspense>
        <Suspense fallback={<DescendingPostsSkeleton/>}>
          <DesendingPosts />
        </Suspense>
      </div>
    </>
  )
}
