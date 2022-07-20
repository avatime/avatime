import { useEffect, useState } from "react";

interface WindowSize {
  height: number;
  width: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { windowSize };
};

function getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
}

export default useWindowSize;
