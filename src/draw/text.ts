import { CanvasRenderingContext2D, createCanvas } from 'canvas';
import type { DrawTextParamsType, TextMeasureStyleType } from '../type';
const MAX_LINE_CLAMP = 999;

export const drawText = (
  ctx: CanvasRenderingContext2D,
  options: DrawTextParamsType
) => {
  const {
    left,
    top,
    width,
    lines,
    color = '#000',
    fontSize = 16,
    fontWeight = 'normal',
    textAlign = 'left',
    lineHeight = fontSize * 1.5,
    textShadow,
    opacity = 1,
  } = options;
  ctx.save();
  ctx.font = `${fontWeight} ${fontSize}px "PingFang SC"`;
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.textAlign = textAlign;
  ctx.globalAlpha = opacity;
  if (textShadow) {
    ctx.shadowColor = textShadow.color;
    ctx.shadowBlur = textShadow.blur;
    ctx.shadowOffsetX = textShadow.offsetX;
    ctx.shadowOffsetY = textShadow.offsetY;
  }
  ctx.textBaseline = 'middle';
  let x = left;
  if (textAlign === 'center') {
    x = left + width / 2;
  }
  if (textAlign === 'right') {
    x = left + width;
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, x, top + i * lineHeight + lineHeight / 2, width);
  }
  ctx.restore();
};

export function measureText(
  text: string,
  width: number,
  measureStyle: TextMeasureStyleType
) {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  const {
    fontSize = 16,
    fontStyle = 'normal',
    fontWeight = '400',
    lineHeight = fontSize * 1.5,
    lineClamp = MAX_LINE_CLAMP,
    letterSpacing = 0,
  } = measureStyle;
  ctx.font = [fontStyle, fontWeight, fontSize + 'px', 'PingFang SC']
    .filter(Boolean)
    .join(' ');
  const lines = [];
  let currentIndex = 1;
  let startIndex = 0;
  while (currentIndex < text.length) {
    const textWidth =
      ctx.measureText(text.slice(startIndex, currentIndex)).width +
      (currentIndex - startIndex) * letterSpacing;
    if (width <= textWidth) {
      if (width < textWidth) {
        currentIndex = currentIndex - 1;
      }
      lines.push(text.slice(startIndex, currentIndex));
      if (lineClamp <= lines.length) {
        let lastLineText: string = lines[lines.length - 1];
        while (
          width <
          ctx.measureText(lastLineText + '...').width +
            (lastLineText.length - 1) * letterSpacing
        ) {
          lastLineText = lastLineText.slice(0, lastLineText.length - 1);
          currentIndex--;
        }
        lines[lines.length - 1] = lastLineText + '...';
        startIndex = currentIndex;
        break;
      }
      startIndex = currentIndex;
    } else {
      currentIndex++;
    }
  }
  if (currentIndex !== startIndex) {
    lines.push(text.slice(startIndex, currentIndex));
  }
  const showLineNumber = lines.length > lineClamp ? lineClamp : lines.length;
  if (lines.length === 1) {
    return {
      width: Math.ceil(ctx.measureText(lines[0]).width),
      height: lineHeight,
      lines,
    };
  }
  return { width: width, height: showLineNumber * lineHeight, lines };
}
