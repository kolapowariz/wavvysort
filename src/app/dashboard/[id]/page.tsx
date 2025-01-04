import Comments from "@/components/Comment";
import PostDetails from "@/components/PostDetails";
import { PostSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostDetails id={params.id} />
      <Comments id={params.id} />
    </Suspense>
  )
}