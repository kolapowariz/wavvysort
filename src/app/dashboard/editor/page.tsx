import MarkdownEditor from "@/components/MarkdownEditor";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";


export default async function Editor() {
  const supabase = await createClient();

  const { data : { user }} = await supabase.auth.getUser();

  if(!user){
    return redirect('/login')
  }
  return (
    <>
      <MarkdownEditor />
    </>
  )
}