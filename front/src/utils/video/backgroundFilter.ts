import { load, drawBokehEffect } from "@tensorflow-models/body-pix";

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
        const backgroundBlurAmount = 6;
        const edgeBlurAmount = 2;
        const flipHorizontal = false;

        drawBokehEffect(canvas, video, it, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
      })
      .catch((e) => {
        console.log("remove blur!!!");
        clearInterval(id);
      });
  }, 100);
}