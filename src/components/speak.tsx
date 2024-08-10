'use client'
import { SpeakProps } from "@/types/types";

export default function Speak( { tit, content}: SpeakProps) {
  return (
    <main>      
      <button onClick={() => speak( tit, content)} className="py-2 px-4 rounded-lg mx-auto block bg-red-500">Read</button>
    </main>
  );
}



const speak = (  tit: string, text: string) => {
  const utterance = new SpeechSynthesisUtterance(`${tit}. ${text}`);
  speechSynthesis.speak(utterance);
};
