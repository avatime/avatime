import { load, drawBokehEffect, toMask, drawMask } from "@tensorflow-models/body-pix";

export async function loadBodyPix(video: any, canvas: any) {
  const options = {
    multiplier: 0.75,
    stride: 32,
    quantBytes: 4,
  };

  let id: any = -1;

  const net = await load(options as any);

  id = setInterval(() => {
    net
      .segmentPerson(video)
      .then((it) => {
        // blurBackground(video, canvas, it);
        silhouette(video, canvas, it);
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
  const bg = toMask(it, { a: 255, r: 255, g: 255, b: 255 }, { a: 255, r: 0, g: 0, b: 0 });
  const opacity = 1;
  drawMask(canvas, video, bg, opacity);
}
