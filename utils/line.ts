import { CanvasRenderingContext2D } from "canvas";

type DrawLineOptionsType = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  style: string;
  lineDash?: number[];
  opacity?: number;
}

export function drawLine(ctx: CanvasRenderingContext2D, options: DrawLineOptionsType) {
  const { startX, startY, endX, endY, style, lineDash, opacity } = options;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = style;
  if (lineDash) {
    ctx.setLineDash(lineDash);
  }
  if (opacity) {
    ctx.globalAlpha = opacity;
  }
  ctx.stroke();
  ctx.restore();
}