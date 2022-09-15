/* https://www.typescriptlang.org/docs/handbook/modules.html
In TypeScript any file containing a top-level import or export is considered a module. 
Conversely, a file without any top-level import or export declarations is treated as a script 
whose contents are available in the global scope (and therefore to modules as well)
*/
//Import a single export
import { obj, numberRegexp } from "./module1";
import { x } from "./module1";

console.log(obj)
console.log(numberRegexp)
console.log(x)

//Import the entire module
import * as module2 from "./module2"
console.log(module2)
