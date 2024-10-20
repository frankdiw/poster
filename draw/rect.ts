import { CanvasRenderingContext2D, loadImage } from 'canvas';
import { BorderType, ColorStopType } from '../type';
import { calculateGradientCoordinate } from '../libs/line-gradient';
type DrawRectOptionsType = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius?: { topLeft?: number; topRight?: number; bottomRight?: number; bottomLeft?: number };
  background?: {
    color?: string;
    image?: string;
    linearGradient?: {
      direction: number | 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
      colorStops: ColorStopType[];
    };
  };
  border?: {
    borderAll?: BorderType;
    borderTop?: BorderType;
    borderRight?: BorderType;
    borderBottom?: BorderType;
    borderLeft?: BorderType;
  };
  opacity?: number;
  boxShadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
};
export async function drawRect(
  ctx: CanvasRenderingContext2D,
  {
    left,
    top,
    width,
    height,
    borderRadius,
    background,
    opacity = 1,
    boxShadow,
    border,
  }: DrawRectOptionsType
) {
  ctx.save();
  ctx.beginPath();
  // 绘制矩形
  if (borderRadius) {
    const { topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0 } = borderRadius;
    ctx.roundRect(left, top, width, height, [topLeft, topRight, bottomRight, bottomLeft]);
  } else {
    ctx.rect(left, top, width, height);
  }
  // 处理透明度
  if (opacity) {
    ctx.globalAlpha = opacity;
  }
  // 处理阴影
  if (boxShadow) {
    const { color, blur, offsetX, offsetY } = boxShadow;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
    ctx.fillStyle = 'rgba(255,255,255,0)';
    ctx.fill();
  }
  ctx.clip();
  // 处理背景颜色/图片/渐变
  if (background) {
    if (background.color) {
      ctx.fillStyle = background.color;
      ctx.fill();
    }
    if (background.image) {
      const image = await loadImage(background.image);
      ctx.drawImage(image, left, top, width, height);
    }
    if (background.linearGradient) {
      const { direction, colorStops } = background.linearGradient;
      const { x0, y0, x1, y1 } = calculateGradientCoordinate({ left, top, width, height, direction });
      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      for(let {color, position} of colorStops) {
        gradient.addColorStop(position,color);
      }
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  // 处理边框
  if (border) {
    ctx.save();
    const { borderAll, borderBottom, borderTop, borderLeft, borderRight } = border;
    if (borderAll) {
      const { borderWidth, borderColor, borderStyle } = borderAll;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      ctx.setLineDash(borderStyle === 'dashed' ? [4, 4] : []);
      const { topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0 } = borderRadius || {};
      ctx.roundRect(left + borderWidth / 2, top + borderWidth / 2, width - borderWidth, height - borderWidth, [
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
      ]);
      ctx.closePath();
      ctx.stroke();
    }
    // 处理单个边框
    if (!borderRadius) {
      if (borderTop) {
        const { borderColor, borderStyle, borderWidth } = borderTop;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.setLineDash(borderStyle === 'dashed' ? [borderWidth, borderWidth] : []);
        ctx.beginPath();
        ctx.moveTo(left + borderWidth / 2, top + borderWidth / 2);
        ctx.lineTo(left + width - borderWidth / 2, top + borderWidth / 2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderBottom) {
        const { borderColor, borderStyle, borderWidth } = borderBottom;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.setLineDash(borderStyle === 'dashed' ? [borderWidth, borderWidth] : []);
        ctx.beginPath();
        ctx.moveTo(left + borderWidth / 2, top + height - borderWidth / 2);
        ctx.lineTo(left + width - borderWidth / 2, top + height - borderWidth / 2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderLeft) {
        const { borderColor, borderStyle, borderWidth } = borderLeft;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.setLineDash(borderStyle === 'dashed' ? [borderWidth, borderWidth] : []);
        ctx.beginPath();
        ctx.moveTo(left + borderWidth / 2, top + borderWidth / 2);
        ctx.lineTo(left + borderWidth / 2, top + height - borderWidth / 2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderRight) {
        const { borderColor, borderStyle, borderWidth } = borderRight;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.setLineDash(borderStyle === 'dashed' ? [borderWidth, borderWidth] : []);
        ctx.beginPath();
        ctx.moveTo(left + width - borderWidth / 2, top + borderWidth / 2);
        ctx.lineTo(left + width - borderWidth / 2, top + height);
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  ctx.restore();
}
