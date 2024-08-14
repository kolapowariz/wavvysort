import { deletePost } from '@/lib/action';
import { TrashIcon, PencilIcon, PlusIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';

 
export function DeletePost({ id }: { id: string }) {

  const deletePostWithId = deletePost.bind(null, id) 
  return (
    <form action={deletePostWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}


 
// ...
 
export function UpdatePost({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/userPosts/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}