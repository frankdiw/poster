import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { FontWeightType, TextAlignType, TextMeasureStyleType } from "../type";
const MAX_LINE_CLAMP = 999;
type DrawParagraphParamsType = {
  left: number;
  top: number;
  lines: string[];
  color?: string;
  fontSize?: number;
  fontWeight?: FontWeightType;
  shadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
  lineHeight?: number;
  width: number;
  textAlign?: TextAlignType;
  opacity?: number;
};

export const drawParagraph = (
  ctx: CanvasRenderingContext2D,
  options: DrawParagraphParamsType
) => {
  const {
    left,
    top,
    width,
    lines,
    color = "#000",
    fontSize = 12,
    fontWeight = "normal",
    textAlign = "left",
    lineHeight = fontSize * 1.5,
    shadow,
    opacity = 1,
  } = options;
  ctx.save();
  ctx.font = `${fontWeight} ${fontSize}px "Microsoft YaHei"`;
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.textAlign = textAlign as any;
  ctx.globalAlpha = opacity;
  if (shadow) {
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = shadow.offsetX;
    ctx.shadowOffsetY = shadow.offsetY;
  }
  ctx.textBaseline = "middle";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, left, top + i * lineHeight + lineHeight / 2, width);
  }
  ctx.restore();
};

export function measureText(
  text: string,
  width: number,
  measureStyle: TextMeasureStyleType
) {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext("2d");
  const {
    fontSize = 16,
    fontStyle = "normal",
    fontWeight = "400",
    lineHeight = fontSize * 1.5,
    lineClamp = MAX_LINE_CLAMP,
    letterSpacing = 0,
  } = measureStyle;
  ctx.font = [fontStyle, fontWeight, fontSize + 'px', "Microsoft YaHei"]
    .filter(Boolean)
    .join(" ");
  let lines = [];
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
          ctx.measureText(lastLineText + "...").width +
            (lastLineText.length - 1) * letterSpacing
        ) {
          lastLineText = lastLineText.slice(0, lastLineText.length - 1);
          currentIndex--;
        }
        lines[lines.length - 1] = lastLineText + "...";
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
  return { width: width, height: showLineNumber * lineHeight, lines };
}
