import { CanvasRenderingContext2D } from "canvas";
import { ElementType } from "../type";
import { drawText } from "./text";
import { drawRect } from "./rect";

export async function draw(
  ctx: CanvasRenderingContext2D,
  element: ElementType
) {
  const {
    left = 0,
    top = 0,
    width = 0,
    height = 0,
  } = element.node?.getComputedLayout() || {};
  let parent = element.node?.getParent();
  let parentLeft = 0,
    parentTop = 0;
  while (parent) {
    parentLeft += parent.getComputedLayout().left;
    parentTop += parent.getComputedLayout().top;
    parent = parent.getParent();
  }
  const currentLeft = left + parentLeft;
  const currentTop = top + parentTop;

  if (element?.type === "text") {
    drawText(ctx, {
      left: currentLeft,
      top: currentTop,
      width,
      lines: element.children as string[],
      color: element.style?.color,
      fontSize: element.style?.fontSize,
      fontWeight: element.style?.fontWeight,
      textAlign: element.style?.textAlign,
      lineHeight: element.style?.lineHeight,
    });
  } else {
    const { borderRadius, border, boxShadow, background, opacity } =
      element?.style || {};
    await drawRect(ctx, {
      left: currentLeft,
      top: currentTop,
      width,
      height,
      border,
      borderRadius,
      boxShadow,
      opacity,
      background: background,
    });
    const children = element?.children || [];
    for (let item of children) {
      if (typeof item !== "string") {
        await draw(ctx, item);
      }
    }
  }
}
