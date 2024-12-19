import EditPost from "@/components/edit-post";
import { fetchPost } from "@/lib/data";
import { notFound } from "next/navigation";
import React from 'react';


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [post] = await Promise.all([fetchPost(id)]);

  if (!post) {
    notFound();
  }
  return (
    <main>
      <h1 className="mt-14 text-center mb-4 md:mt-20">Edit Your Post</h1>
      {post && <EditPost post={post} />}
    </main>
  )
}