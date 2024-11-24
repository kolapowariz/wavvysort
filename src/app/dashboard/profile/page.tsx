import { SheetSide } from "@/components/ui/dashboard/sheeter";
import { fetchUserProfile } from "@/lib/data";
import type { User } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserPost from "./userPosts/page";



export default async function Profile() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login')
  }

  const profiles: User[] = await fetchUserProfile(user.id) as unknown as User[];
  const [userProfile] = await Promise.all([fetchUserProfile(user.id)]);

  // get public url for image.
  return (
    <div className="mt-20">
      <h1 className="text-5xl text-center">Profile</h1>

      <section className="md:flex my-4 justify-between md:w-[70%] mx-auto border">
        <SheetSide />
        <ul className="text">
          {profiles!.map((profile) => (
            <li key={profile.id}>
              <p>{profile.email}</p>
              <p>{profile.bio}</p>
              <p>{profile.firstname} {profile.lastname}</p>
              <Image src={profile.avatar_url ?? '/nft.jpg'} alt={profile.firstname!} width={400} height={500} className="rounded-full mx-auto text-center block" />
            </li>
          ))}
        </ul>
      </section>
      <UserPost />

    </div>
  );
}