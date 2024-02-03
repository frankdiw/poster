import { createCanvas } from "canvas";
import fs from "fs";
import { drawParagraph } from "./utils/paragraph";
const canvas = createCanvas(750, 1392);
const ctx = canvas.getContext("2d");

(async () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 750, 1392);
  drawParagraph(ctx,
    {
      x: 0, y: 0, text: '轻量应用服务器轻量应用服务器轻量应用服务器轻量应用服务器ceisgdastduasdas轻量应用服务器轻量应用服务器轻量应用服务器轻量应用服务器ceisgdastduasdas', width: 400,
      font: { weight: 'bold', size: 32, color: 'red' }, lineClamp: 3, ellipsis: true,
      opacity: 0.5,
      lineHeight: 48
    })
  const out = fs.createWriteStream(__dirname + "/test.jpeg");
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
})();
