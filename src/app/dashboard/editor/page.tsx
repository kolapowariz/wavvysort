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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, quod sed rerum cum, modi expedita labore quam veritatis nisi fugit harum ratione architecto omnis dignissimos illo sequi assumenda ex. Nisi?</p>
    </>
  )
}