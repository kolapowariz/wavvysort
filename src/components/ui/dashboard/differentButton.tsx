import { deletePost } from '@/lib/action';
import { TrashIcon } from '@heroicons/react/24/outline';

 
export function DeletePost({ id }: { id: string }) {

  const deletePostWithId = deletePost.bind(null, id)
  console.log(deletePostWithId);
  
 
  return (
    <form action={deletePostWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}