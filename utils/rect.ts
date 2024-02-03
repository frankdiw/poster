import { Image, CanvasRenderingContext2D } from "canvas";

type DrawRectOptionsType = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fill?: {
    style?: string;
    image?: Image;
  };
  stroke?: {
    lineWidth: number;
    style: string;
  },
  opacity?: number;
  shadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  },
}
export function drawRect(ctx: CanvasRenderingContext2D, { x, y, width, height, radius, fill, stroke,opacity, shadow }: DrawRectOptionsType) {
  ctx.save();
  ctx.beginPath();
  if (radius) {
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.clip();
  } else {
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.clip();
  }
  if(opacity) {
    ctx.globalAlpha = opacity;
  }
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = shadow.offsetX;
    ctx.shadowOffsetY = shadow.offsetY;
  }
  if (fill) {
    if (fill.style) {
      ctx.fillStyle = fill.style;
      ctx.fill();
    }
    if (fill.image) {
      ctx.drawImage(fill.image, x, y, width, height);
    }
  }
  if (stroke) {
    ctx.lineWidth = stroke.lineWidth;
    ctx.strokeStyle = stroke.style;
    ctx.stroke();
  }
  ctx.restore();
}
