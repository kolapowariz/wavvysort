import { fetchUserProfile } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { User } from "@/types/custom";
import { SheetSide } from "@/components/ui/dashboard/sheeter";
import UserPost from "./userPosts/page";



export default async function Profile() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login')
  }

  const profiles: User[] = await fetchUserProfile(user.id) as unknown as User[];

  // get public url for image.
  return (
    <div>
      <h1 className="text-5xl text-center">Profile</h1>

      <section className="flex my-4 justify-between">
      <ul>
        {profiles!.map((profile) => (
          <li key={profile.id}>
            <p>{profile.email}</p>
            <p>{profile.username}</p>
            {/* <p>{profile.bio}</p> */}
            {/* <p>{profile.fullname}</p> */}
            {/* <Image src={profile?.avatar_url} alt={profile?.full_name} width={100} height={100} /> */}
          </li>
        ))}
      </ul>
      <SheetSide />
      </section>
      <UserPost />

    </div>
  );
}