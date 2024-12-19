'use client'
import { createComment } from '@/lib/action';
import { useRef } from 'react';
import { toast } from "sonner";
import { Button } from '../button';
import React from 'react';

export function CreateComment({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={async (data) => {
      // 'use server';
      await createComment(postId, data);
      formRef.current?.reset();
      toast("Your comment has been sent", {
        description: `${new Date().toUTCString()}`,
      });
    }} ref={formRef}>
      <h1 className='text-center' id='comments'>Comments</h1>
      <input type="text" name="comment" id="comment" className='w-full mt-4 block mx-auto p-2 rounded-md' placeholder='Enter your comment' />
      <Button type="submit" className='mt-4 block mx-auto'>Post</Button>
    </form>
  )
}