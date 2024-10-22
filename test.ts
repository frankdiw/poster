import fs from "fs";
import poster from ".";
(async () => {
  const jsx = fs.readFileSync("./poster.jsx", "utf-8");
  const buffer = await poster({ jsx, returnType: "buffer" });
  fs.writeFileSync("./poster.jpg", buffer);
})();
