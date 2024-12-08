import poster from '../src/index';
import fs from 'fs';
import path from 'path';
(async () => {
  fs.writeFileSync(path.resolve(import.meta.dirname, './poster.jpg'),await poster({
    jsx: fs.readFileSync(path.resolve(import.meta.dirname, './test.jsx'), 'utf-8'),
    returnType: 'buffer',
  }),);
})();
