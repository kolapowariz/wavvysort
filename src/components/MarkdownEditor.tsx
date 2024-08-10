'use client';
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useRef} from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/action";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";


const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false, loading: () => <Skeleton className="w-[100%] mx-auto h-[75vh]" />
});


export default function MarkdownEditor() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form action={async (data) => {
        await createPost(data);
        formRef.current?.reset();
      }} ref={formRef}>
        <div className="mb-4 mx-auto">
          <input type="text" id="title" name="title" required placeholder="Title" className="block mx-auto w-[20rem] p-2 rounded-md placeholder:text-center dark:text-black bg-gray-200" />
        </div>
        <MdEditor
          style={{ height: "75vh" }}
          renderHTML={(content) => <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>}
          name="content"
          id="content"
        />
        <Button className="block mt-2 mx-auto">Post</Button>
      </form>
    </>
  );
}


