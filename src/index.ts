import { createCanvas, registerFont } from 'canvas';
import { layout } from './libs/layout';
import { parse } from './libs/parse';
import { draw } from './draw';
import { PosterParamsType } from './type';
import path from 'path';
registerFont(
  path.resolve(import.meta.dirname || __dirname, './fonts/PingFang.ttc'),
  {
    family: 'PingFang SC',
  }
);
export default async function poster({
  jsx,
  props,
  mimeType = 'image/jpeg',
  returnType = 'buffer',
}: PosterParamsType) {
  const root = parse(jsx, props);
  const element = layout(root);
  const { width, height } = element.node?.getComputedLayout() || {};
  const canvas = createCanvas(width || 0, height || 0);
  const ctx = canvas.getContext('2d');
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
