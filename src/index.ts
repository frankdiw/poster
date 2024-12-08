import { createCanvas } from 'canvas';
import { layout } from './libs/layout';
import { parse } from './libs/parse';
import { draw } from './draw';
import { PosterParamsType } from './type';
export default async function poster({
  jsx,
  props,
  mimeType = 'image/jpeg',
  returnType = 'buffer',
}: PosterParamsType) {
  // 解析jsx
  const root = parse(jsx, props);
  // 布局引擎计算元素布局
  const layoutTree = layout(root);
  const { width, height } = layoutTree.layoutNode?.getComputedLayout() || {};
  const canvas = createCanvas(width || 0, height || 0);
  const ctx = canvas.getContext('2d');
  // 绘制
  await draw(ctx, root);
  if (mimeType === 'image/png') {
    if (returnType === 'base64') {
      return canvas.toDataURL('image/png');
    }
    return canvas.toBuffer('image/png');
  } else {
    if (returnType === 'base64') {
      return canvas.toDataURL('image/jpeg');
    }
    return canvas.toBuffer('image/jpeg');
  }
}

export * from './type';
