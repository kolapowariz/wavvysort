import { fetchUserProfile } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { User } from "@/types/custom";
import { SheetSide } from "@/components/ui/dashboard/sheeter";


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
      <h1>Profile</h1>
      <ul>
        {profiles!.map((profile) => (
          <li key={profile.id}>
            <p>{profile.email}</p>
            <p>{profile.username}</p>
          </li>
        ))}
      </ul>
      {/* <Image src={user?.avatar_url} alt={user?.full_name} width={100} height={100} /> */}
      <SheetSide />

    </div>
  );
}