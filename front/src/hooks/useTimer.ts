import { useEffect, useState } from "react";

const useTimer = (count: number, intervalMillis: number = 1000) => {
  const [timer, setTimer] = useState(count);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => prev - intervalMillis / 1000);
    }, intervalMillis);
    return () => clearInterval(id);
  }, [timer, intervalMillis]);

  return timer;
};

export default useTimer;
