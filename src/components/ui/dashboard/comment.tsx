'use client'
import { createComment } from '@/lib/action';
import { Button } from '../button';
import { useRef } from 'react';

export function CreateComment({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);  

  return (
    <form action={async (data) => {
      // 'use server';
      await createComment(postId, data);
      formRef.current?.reset();
    }} ref={formRef}>
      <h1 className='text-center'>Comments</h1>
      <input type="text" name="comment" id="comment" className='w-full mt-4 block mx-auto p-2 rounded-md' placeholder='Enter your comment' />
      <Button type="submit" className='mt-4 block mx-auto'>Post</Button>
    </form>
  )
}