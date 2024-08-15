import { deletePost } from '@/lib/action';
import { TrashIcon, PencilIcon, PlusIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';


export function DeletePost({ id }: { id: string }) {

  const deletePostWithId = deletePost.bind(null, id)
  return (
    // <form action={deletePostWithId}>
    //   <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
    //     <span className="sr-only">Delete</span>
    //     <TrashIcon className="w-4" />
    //   </button>
    //   <AlertDialogComponent />

    // </form>
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
            <Button type="submit" >Delete
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
      href={`/dashboard/userPosts/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}



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

// export function AlertDialogComponent() {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger><TrashIcon className="w-8" /></AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your account
//             and remove your data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <form action="">
//             <button type="submit">
//               <AlertDialogAction>Continue</AlertDialogAction>
//             </button>
//           </form>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>

//   )
// } className="rounded-md border p-2 hover:bg-gray-100"