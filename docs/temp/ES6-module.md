# ES6 模块

## import 几种用法
``` js
import defaultName from 'modules.js';

import { export } from 'modules';
import { export as ex1 } from 'modules';
import { export1, export2 } from 'modules.js';
import { export1 as ex1, export2 as ex2 } from 'moduls.js';

import defaultName, { expoprt } from 'modules';
import * as moduleName from 'modules.js';
import defaultName， * as moduleName from 'modules';

import 'modules';
```

## export 几种用法
``` js
// 使用export {}不能使用import {name1, name2, …} from '...'方式导入
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };

// 使用export type才是import {name1, name2, …} from '...'的正确使用方式
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName() {...}
export class ClassName {...}

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// 导入和导出在一行。这种方式非常适合重构时，帮助把大文件拆分成多个小文件
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

## 参考文章

* [阮一峰-ESMAScript6入门](http://es6.ruanyifeng.com/#docs/module)
* [ES6 export * from import](https://stackoverflow.com/questions/38077164/es6-export-from-import)
* [javascript中import和export用法总结](https://segmentfault.com/a/1190000016417637)