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
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

async function UserPosts() {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login')
  }

  const posts: Post[] = await fetchUserPosts(user.id) as unknown as Post[];

  if (!posts) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl">Posts Written By {user.email}</h1>
      <ul className="md:grid md:grid-cols-2 md:w-[100%]">
        {posts!.map((post) => (
          <li key={post.id} className="md:w-[95%] mt-2 mb-4 border-b-2">
            <Link href={`/dashboard/${post.id}`}>
              <h2 className="text-lg md:text-xl">{post.title}</h2>
              <section className="md:flex gap-2">
                <Image src={`${post.image}`} width={300} height={300} className="w-full md:w-52 h-32 mx-auto md:mx-0 " alt="Uplaoded Image" />

                
                {/* <img src={`${post.image}`} className="w-full md:w-52 h-32 mx-auto md:mx-0 " alt="Uplaoded Image" /> */}
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

export default async function UserPost() {



  return (
    <div>
      <Suspense fallback={<UserPostsSkeleton />}>
        <UserPosts />
      </Suspense>

    </div>
  )
}
