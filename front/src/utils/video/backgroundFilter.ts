import { load, drawBokehEffect, toMask, drawMask } from "@tensorflow-models/body-pix";

export async function loadBodyPix(video: any, canvas: any, callback: () => void) {
  const options = {
    multiplier: 0.75,
    stride: 32,
    quantBytes: 4,
  };

  const net = await load(options as any);

  let id = setInterval(() => {
  net
    .segmentPerson(video)
    .then((it) => {
      // blurBackground(video, canvas, it);
      // silhouette(video, canvas, it);
      callback();
    })
    .catch((e) => {
      console.log("remove blur!!!");
      clearInterval(id);
    });
  }, 100);
}

function blurBackground(video: any, canvas: any, it: any) {
  const backgroundBlurAmount = 6;
  const edgeBlurAmount = 2;
  const flipHorizontal = false;

  drawBokehEffect(canvas, video, it, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
}

function silhouette(video: any, canvas: any, it: any) {
  const bg = toMask(it, { a: 0, r: 255, g: 255, b: 255 }, { a: 255, r: 0, g: 0, b: 0 });
  const opacity = 1;
  drawMask(canvas, video, bg, opacity);
}
