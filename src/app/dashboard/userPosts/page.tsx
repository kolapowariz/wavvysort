import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { fetchUserPosts } from "@/lib/data";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { DeletePost, UpdatePost } from "@/components/ui/dashboard/differentButton";
import { UserPostsSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { Post } from "@/types/custom";

async function UserPosts() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login')
  }

  const posts: Post[] = await fetchUserPosts(user.id) as unknown as Post[];

  return (
    <div>
      <h1 className="text-center text-3xl">Posts Written By {user.email}</h1>
      <ul>
        {posts!.map((post) => (
          <li key={post.id} className=" mt-2 mb-4 border-b-2 md:w-[50%]">
            <Link href={`/dashboard/${post.id}`}>
              {/* <p className="text-xs">{post['user_id']}</p> */}
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{post.header}</Markdown>
              <p className="text-xs">{post['created_at']?.slice(0, 10)}</p>
            </Link>
            <div className="my-2 flex gap-2 justify-center items-center">
              <DeletePost id={post.id} />
              <UpdatePost id={post.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function UserPost() {



  return (
    <div>
      <Suspense fallback={<UserPostsSkeleton />}>
        <UserPosts />
      </Suspense>

    </div>
  )
}
