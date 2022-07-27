import { useEffect, useState } from "react";
import * as fm from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";

export const useFaceMesh = (videoRef: any, canvasRef: any, active: boolean) => {
  const [intervalId, setIntervalId] = useState<any>(null);
  const [flag, setFlag] = useState<boolean>(true);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }
    console.log("init@@@@@@@@@@@@@@", canvasRef, videoRef);

  
    if (active) {
      const faceMesh = new fm.FaceMesh({
        locateFile: (file: any) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((result: any) => onResults(result, canvasRef.current));
      setIntervalSynchronous(async () => {
        await faceMesh.send({ image: videoRef.current });
      }, 100);
    }
  }, [canvasRef, videoRef, active]);
};

function onResults(results: any, canvasElement: any) {
  const canvasCtx = canvasElement.getContext("2d");
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_TESSELATION, {
        color: "#000000",
        lineWidth: 1000,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_RIGHT_EYE, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_RIGHT_EYEBROW, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LEFT_EYE, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LEFT_EYEBROW, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_FACE_OVAL, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LIPS, {
        color: "#FFFFFF",
        lineWidth: 1,
      });
    }
  }
  canvasCtx.restore();
}

const setIntervalSynchronous = function (func: () => Promise<void>, delay: number) {
  let timeoutId: any;
  const intervalFunction = async function () {
    await func();
    timeoutId = setTimeout(intervalFunction, delay);
  };
  timeoutId = setTimeout(intervalFunction, delay);
  return function () {
    clearTimeout(timeoutId);
  };
};
