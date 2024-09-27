import Link from 'next/link';
import NavLinks from '@/components/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/login/action';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types/custom";
import { fetchUserProfile } from "@/lib/data";
import { profile } from 'console';



export default async function SideNav() {
  const supabase = await createClient();


  const { data: { user } } = await supabase.auth.getUser();


  let profiles: User[] = [];
  if (user) {
    profiles = await fetchUserProfile(user.id) as unknown as User[];
  }

  const mapProfile = profiles.map((profile) => (
    <li key={profile.id}>
      <p>{profile.firstname?.slice(0, 1)} {profile.lastname?.slice(0, 1)}</p>
    </li>
  ));


  return (
    <div className="flex justify-between md:justify-between gap-4 px-2 py-2 md:gap-20 md:px-6">
      <Link
        className="h-18 rounded-md bg-gray-600 p-2 md:h-20"
        href="/"
      >
        <div className="w-10 md:w-20">
          <Image src='/image.svg' width={60} height={10} alt="NFT Logo" priority className='rounded-full mx-auto' />
        </div>
      </Link>
      <div className="flex grow md:grow-0  justify-around space-x-2 md:flex ">
        <NavLinks />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {profiles.map(profile => (
              <Avatar key={profile.id}>
                {/* <AvatarImage src={user?.avatar_url} alt={user?.full_name} /> */}
                <AvatarFallback>{profile.firstname?.slice(0, 1)} {profile.lastname?.slice(0, 1)}</AvatarFallback>
              </Avatar>
            ))}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/dashboard/profile' className='w-full'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>
              <div>
                {user !== null ? (
                  <form action={signOut}>
                    <button className="flex gap-2">
                      <div className="">Sign Out</div>
                      <PowerIcon className="w-4" />
                    </button>

                  </form>
                ) : (
                  <button className="flex gap-2">
                    <div className="">
                      <Link href='/login'>Sign In</Link>
                    </div>
                    <PowerIcon className="w-4" />
                  </button>
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
