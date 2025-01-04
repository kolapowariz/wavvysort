import { supabase } from "@/lib/supabaseClient";

export const handleProfileImageUpload = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  let { error } = await supabase.storage.from('profiles').upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: url } = await supabase.storage.from('profiles').getPublicUrl(filePath);

  return url.publicUrl;
};