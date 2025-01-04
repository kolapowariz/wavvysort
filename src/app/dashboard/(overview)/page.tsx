import { DesendingPosts } from "@/components/DescendingPost";
import { Posts } from "@/components/Posts";
import Search from "@/components/search";
import { DashboardSkeleton, DescendingPostsSkeleton } from "@/components/skeleton";
import { Suspense } from "react";


export default function Page({
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
        <Suspense fallback={<DescendingPostsSkeleton />}>
          <DesendingPosts />
        </Suspense>
      </div>
    </>
  )
}

