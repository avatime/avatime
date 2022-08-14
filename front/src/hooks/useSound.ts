import { useEffect, useRef } from "react";

export const useSound = () => {
  const ref = useRef<any>();
  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sound_button.mp3`);
    
    ref.current.addEventListener("click", () => {
      audio.load();
      audio.play();
    });
  }, []);

  return ref;
};
