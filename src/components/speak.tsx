'use client'
import { SpeakProps } from "@/types/types";
import { PlayIcon, ResumeIcon, PauseIcon, CircleBackslashIcon} from '@radix-ui/react-icons'

export default function Speak({ tit, content }: SpeakProps) {
  return (
    <main className="flex mb-4">
      <button onClick={() => speak(tit, content)} title="Play" className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white"><PlayIcon width={20} height={20}/></button>
      <button onClick={() => pause()} title="Pause" className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white"><ResumeIcon width={20} height={20}/></button>
      <button onClick={() => play()} title="Resume" className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white"><PauseIcon width={20} height={20}/></button>
      <button onClick={() => stop()} title="Cancel" className="py-2 px-4 rounded-lg mx-auto block bg-[#09233c] text-white"><CircleBackslashIcon width={20} height={20} /></button>
    </main>
  );
}

const speak = (tit: string, text: string) => {
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