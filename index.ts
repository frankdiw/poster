import { createCanvas } from "canvas";
import fs from "fs";
import { drawParagraph } from "./utils/paragraph";
import { parse } from "./libs/parse";
const canvas = createCanvas(750, 1392);
const ctx = canvas.getContext("2d");

(async () => {
  const result= parse(fs.readFileSync('./index.jsx',{encoding:'utf-8'}), {a:1})
  console.log(JSON.stringify(result,null,2))
})();
