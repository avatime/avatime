import * as fm from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";

let faceMesh: any = undefined;

export function init(canvasElement: any) {
  if (faceMesh) {
    return;
  }
  console.log("init");
  faceMesh = new fm.FaceMesh({
    locateFile: (file: any) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults((result: any) => onResults(result, canvasElement));
  faceMesh.initialize();
}

export function facemesh(videoElement: any) {
    faceMesh.send({ image: videoElement });
}

function onResults(results: any, canvasElement: any) {
  const canvasCtx = canvasElement.getContext("2d");
  canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_TESSELATION, {
        color: "#000000",
        lineWidth: 1000,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_RIGHT_EYE, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_RIGHT_EYEBROW, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LEFT_EYE, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LEFT_EYEBROW, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_FACE_OVAL, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
      drawConnectors(canvasCtx, landmarks, fm.FACEMESH_LIPS, {
        color: "#FFFFFF",
        lineWidth: 5,
      });
    }
  }
  canvasCtx.restore();
}
