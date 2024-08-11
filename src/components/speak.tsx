'use client'
import { SpeakProps } from "@/types/types";

export default function Speak( { tit, content}: SpeakProps) {
  return (
    <main className="flex mb-4">      
      <button onClick={() => speak( tit, content)} className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white">Read</button>
      <button onClick={() => pause()} className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white">Pause</button>
      <button onClick={() => play()} className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white">Resume</button>
      <button onClick={() => stop()} className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white">Cancel</button>
    </main>
  );
}


const speak = (  tit: string, text: string) => {
  const utterance = new SpeechSynthesisUtterance(`${tit}. ${text}`);
  speechSynthesis.speak(utterance);
};


const pause = () => {
  speechSynthesis.pause();
};

const play = () => {
  speechSynthesis.resume();
};

const stop = () => {
  speechSynthesis.cancel();
};