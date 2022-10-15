"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*we need to configure the TS compiler :
create the configuration file (tsconfig.json) running tsc --init
    "rootDir": "./src",   //Specify the root folder within your source files.
    "outDir": "./build",  // Specify an output folder for all emitted files
then running 'tsc' the compiler builds all the code inside src and puts it into a build folder

tsc -w
to compile in watch mode, when we sava a file the compiler immedialty elaborates it

npm run compileTs

Fast debug: ts-node ./src/index.ts from javascript debug terminal

*/
const linkedList_1 = require("./linkedList/linkedList");
const bubbleSort_1 = require("./bubbleSort");
const NumberCollection_1 = require("./NumberCollection");
const CharactersCollection_1 = require("./CharactersCollection");
console.log('hi all');
const x = new NumberCollection_1.NumberCollection([0, 10, -1, 5, 344, -7, 9, 0.5, -0.5]);
const sorter = new bubbleSort_1.Sort();
sorter.sort(x);
console.log(x.data);
var cc = new CharactersCollection_1.CharactersCollection('La Sui Monti (zzz) Me ne vo');
sorter.sort(cc);
console.log(cc.data);
console.log(sorter.sortBad([0, 10, -1, 5, 344, -7, 9, 0.5, -0.5]));
var t = new linkedList_1.LinkedList();
t.add(5);
t.add(764);
t.add(-43);
t.add(54.78);
t.add(532);
t.add(889);
t.add(4);
t.add(758);
t.add(764);
console.log('length: ', t.length);
//console.log('length: ', new LinkedList().length);
console.log(" compare 0 - 2: ", t.compare(0, 2));
console.log(" compare 0 - 3: ", t.compare(0, 3));
console.log(" compare 5 - 7: ", t.compare(5, 7));
console.log(" compare 1 - 9: ", t.compare(1, 8));
t.print();
console.log('------------------------------------------------');
sorter.sort(t);
t.print();
