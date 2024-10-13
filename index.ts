import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import fs from "fs";
import {layout} from "./libs/layout";
import { parse } from "./libs/parse";
import { draw } from "./draw";
let ctx: CanvasRenderingContext2D;
(async () => {
  const root = parse(fs.readFileSync("./test.jsx", "utf-8"), { height: 15 });
  const element = layout(root);  
  const { width, height } = element.node?.getComputedLayout() || {};
  const canvas = createCanvas(width || 0, height || 0);
  ctx = canvas.getContext("2d");
  await draw(ctx, root);
  fs.writeFileSync("./test.png", canvas.toBuffer());
})();
