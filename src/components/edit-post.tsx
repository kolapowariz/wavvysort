'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { updatePost } from '@/lib/action';
import type { Post as PostType } from "@/types/custom";
import "react-markdown-editor-lite/lib/index.css";
import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { handleImageUpload } from './MarkdownEditor';


const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false, loading: () => <Skeleton className="w-[100%] mx-auto h-[75vh]" />
});

export default function EditPost({ post }: { post: PostType }) {


  const updatePostWithId = updatePost.bind(null, post.id)
  return (
    <form action={updatePostWithId}>
      <input type='hidden' name='id' value={post.id} />

      <div className="mb-4 mx-auto">
        <input type="text" id="title" name="title" required placeholder="Title" className="block mx-auto w-[20rem] p-2 rounded-md placeholder:text-center dark:text-black bg-gray-200" defaultValue={post.title} />
      </div>
      <MdEditor
        style={{ height: "75vh" }}
        renderHTML={(content) => <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]} >{content}</ReactMarkdown>}
        defaultValue={post.content}
        onImageUpload={handleImageUpload}
        name="content"
        id="content"

      />
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/userPosts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Post</Button>
      </div>
    </form>
  );
}