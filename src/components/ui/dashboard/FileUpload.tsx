'use client'

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload = async () => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('You must select a file to upload');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error } = await supabase.storage.from('images').upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: url } = await supabase.storage.from('images').getPublicUrl(filePath);

      console.log(url);

      setFileUrl(url.publicUrl);
      alert('File uploaded successfully');

    } catch (error) {
      console.error('Error uploading file: ');

    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
      {fileUrl && (
        <div>
          <p>File uploaded to: {fileUrl}</p>
          <Image src={fileUrl} width={300} height={300} alt="Uploaded Image" />
        </div>
      )}
    </div>
  )
}