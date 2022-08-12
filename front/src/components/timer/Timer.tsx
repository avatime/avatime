import React, { FC, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";

interface IProps {
  duration: number;
  remainingTime: number;
}

export const Timer: FC<IProps> = ({ duration, remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const isNewTimeFirstTick = useRef(false);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  const renderTime = () => (
    <div className="time-wrapper">
      <div key={remainingTime} className="up">
        {remainingTime}
      </div>
    </div>
  );

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        initialRemainingTime={remainingTime}
        size={70}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
