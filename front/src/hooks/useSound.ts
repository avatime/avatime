import { useEffect, useRef } from "react";
import Sound from "../assets/audio/sound_button.mp3"

export const useSound = () => {
  const ref = useRef<any>();
  useEffect(() => {
    const audio = new Audio(Sound);
    
    ref.current.addEventListener("click", () => {
      audio.load();
      audio.play();
    });
  }, []);

  return ref;
};
