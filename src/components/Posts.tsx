import { CommentNum } from "@/components/CommentNum";
import CopyLinkButton from "@/components/copy";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchFilteredPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export async function Posts({
  searchParams = {},
  query,
}: {
  searchParams?: {
    query?: string;
  };
  query?: string;
}) {
  const finalQuery = query || searchParams?.query || '';
  const posts: Post[] = await fetchFilteredPosts(finalQuery) as Post[];
  if (!posts || posts.length === 0) {
    notFound();
  }
  return (
    <>
      <ul className="md:border md:rounded-md p-4">
        {posts.map((post: Post) => (
          <li key={post.id} className="md:w-[100%] mt-2 mb-4 mx-auto border-b-2">
            <Link href={`/dashboard/${post.id}`}>
              <section className="flex gap-2 items-center z-0">
                <Avatar>
                  {/* <AvatarImage src={post?.avatar_url ?? undefined} alt={post.firstname!} /> */}
                  <AvatarFallback>{post.firstname?.slice(0, 1)}{post.lastname?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p>{post.firstname} {post.lastname}</p>
              </section>
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