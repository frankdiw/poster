import { CanvasRenderingContext2D, createCanvas } from 'canvas';
import fs from 'fs';
import { layout } from './libs/layout';
import { parse } from './libs/parse';
import { draw } from './draw';
let ctx: CanvasRenderingContext2D;
(async () => {
  console.time('poster');
  const buffer = await poster({
    jsx: fs.readFileSync('./test.jsx', 'utf-8'),
    props: { height: 15 },
    mimeType: 'image/jpeg',
    returnType: 'base64',
  });
  console.timeEnd('poster');
  fs.writeFileSync('./test.txt', buffer);
})();
export type PosterParamsType = {
  jsx: string;
  props?: Record<string, any>;
  mimeType?: 'image/jpeg' | 'image/png';
  returnType: 'buffer' | 'base64';
};

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
  ctx = canvas.getContext('2d');
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
