import { Image, CanvasRenderingContext2D } from "canvas";
type DrawParagraphParamsType = {
  x: number;
  y: number;
  text: string;
  font: {
    color: string;
    size: number;
    weight: number | 'bold' | 'normal',
  },
  shadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  },
  lineHeight?: number;
  width: number;
  lineClamp?: number;
  ellipsis?: boolean;
  textAlign?: 'start' | 'end' | 'center',
  opacity?: number;
};

export const drawParagraph = (ctx: CanvasRenderingContext2D, options: DrawParagraphParamsType) => {
  const {
    x,
    y,
    width,
    lineClamp = 1,
    ellipsis,
    text,
    font: {
      color,
      weight,
      size
    },
    textAlign = 'left',
    lineHeight = size,
    shadow,
    opacity = 1,
  } = options;
  ctx.save();
  ctx.font = `${weight} ${size}px "PingFang SC"`;
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.textAlign = textAlign;
  ctx.globalAlpha = opacity;
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = shadow.offsetX;
    ctx.shadowOffsetY = shadow.offsetY;
  }
  let lines = 0;
  let startIndex = 0;
  let index = 1;
  ctx.textBaseline = 'middle';
  const lineList: string[] = [];
  while (index < text.length) {
    const { width: lineWidth } = ctx.measureText(text.slice(startIndex, index));
    let lineText = text.slice(startIndex, index);
    if (lineWidth >= width) {
      if (lineWidth > width) {
        index = index - 1;
        lineText = text.slice(startIndex, index);
      }
      lines += 1;
      if (lines >= lineClamp) {
        if (ellipsis) {
          const ellipsisWidth = ctx.measureText('...');
          let length = 1;
          while (true) {
            const width = ctx.measureText(lineText.slice(lineText.length - length, lineText.length))
            if (width >= ellipsisWidth) {
              break;
            }
            length++;
          }
          index = index - length;
          lineText = text.slice(startIndex, index) + '...';
        }
        lineList.push(lineText);
        startIndex = index;
        break;
      }
      startIndex = index;
      lineList.push(lineText);
    } else {
      index++;
    }
  }
  if (startIndex !== index) {
    lineList.push(text.slice(startIndex, index));
  }
  for (let i = 0; i < lineList.length; i++) {
    const line = lineList[i];
    ctx.fillText(line, x, y + i * lineHeight + lineHeight / 2, width);
  }
  ctx.restore();
};