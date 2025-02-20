import { UserPostsSkeleton } from "@/components/skeleton";
import { DeletePost, UpdatePost } from "@/components/ui/dashboard/differentButton";
import { fetchUserPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function UserPosts() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login')
  }

  const posts: Post[] = await fetchUserPosts(user.id) as unknown as Post[];

  if (!posts || posts.length === 0) {
    return <p className="text-center mt-4 text-2xl md:text-3xl">You have not written any post. <Link href='/dashboard/editor' className="text-red-300">Click here to write your first post</Link> </p>
  }

  return (
    <div className="px-10 mx-auto ">
      <h1 className="text-center text-2xl md:text-3xl">Posts Written By {user.email}</h1>
      <ul className="md:grid md:grid-cols-2 md:w-[100%]">
        {posts.map((post) => (
          <li key={post.id} className="md:w-[70%] mx-auto mt-2 mb-4 border-b-2">
            <Link href={`/dashboard/${post.id}`}>
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <section className="md:flex gap-2">
                <Image src={`${post.image}`} width={300} height={300} className="w-full md:w-52 h-32 mx-auto md:mx-0 rounded-md" alt="Uplaoded Image" />
                <p className="">{post.header?.split('')}</p>
              </section>
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

export default function UserPost() {



  return (
    <div>
      <Suspense fallback={<UserPostsSkeleton />}>
        <UserPosts />
      </Suspense>

    </div>
  )
}
