import { Image, CanvasRenderingContext2D } from "canvas";

type DrawImageParamsType = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  image: Image;
  radius?: number;
};

export const drawImage = ({
  ctx,
  x,
  y,
  width,
  height,
  image,
  radius,
}: DrawImageParamsType) => {
  if (radius) {
    ctx.save();
    ctx.beginPath();
    // 创建圆角矩形路径
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    // 裁剪路径
    ctx.clip();
    // 在路径中绘制图片
    ctx.drawImage(image, x, y, width, height);
    ctx.restore();
  } else {
    ctx.drawImage(image, x, y, width, height);
  }
};

export const drawParagraph = () => {
  
};
