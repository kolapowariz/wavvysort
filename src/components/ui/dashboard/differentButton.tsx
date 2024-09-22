import { createComment, deletePost } from '@/lib/action';
import { TrashIcon, PencilIcon, PlusIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '../button';


export function DeletePost({ id }: { id: string }) {

  const deletePostWithId = deletePost.bind(null, id)
  return (
    <AlertDialog>
      <AlertDialogTrigger><TrashIcon className="w-8" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deletePostWithId}>
          {/* <AlertDialogAction>Delete</AlertDialogAction> */}
            <Button className='w-full' type="submit" >Delete
              <span className="sr-only">Delete</span>
            </Button>

          </form>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  );
}



// ...

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/profile/userPosts/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

