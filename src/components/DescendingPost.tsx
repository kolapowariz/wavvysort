import { fetchDesendingPosts } from "@/lib/data";
import { Post } from "@/types/custom";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function DesendingPosts() {
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