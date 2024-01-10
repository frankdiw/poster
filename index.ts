import { loadImage, createCanvas } from "canvas";
import { drawImage } from "./util";
import fs from "fs";
const canvas = createCanvas(750, 1392);
const ctx = canvas.getContext("2d");

(async () => {
  const [image, avatar, qrcode] = await Promise.all([
    loadImage("./poster.png"),
    loadImage(
      "https://developer.qcloudimg.com/http-save/10011/5219d8aaa3af9ce46e90ac5f2b200821.jpg"
    ),
    loadImage(
      "https://qcloudimg.tencent-cloud.cn/raw/dad61ae6b851b4580d23ffcc4823aef5.png"
    ),
  ]);
  drawImage({ ctx, x: 0, y: 0, width: 750, height: 1392, image: image });
  drawImage({
    ctx,
    x: 54,
    y: 150,
    width: 72,
    height: 72,
    image: avatar,
    radius: 36,
  });
  drawImage({
    ctx,
    x: 58,
    y: 1188,
    width: 160,
    height: 160,
    image: qrcode,
    radius: 8,
  });
  const out = fs.createWriteStream(__dirname + "/test.jpeg");
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
})();
