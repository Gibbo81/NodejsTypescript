/*we need to configure the TS compiler :
create the configuration file (tsconfig.json) running tsc --init
    "rootDir": "./src",   //Specify the root folder within your source files. 
    "outDir": "./build",  // Specify an output folder for all emitted files
then running 'tsc' the compiler builds all the code inside src and puts it into a build folder

tsc -w 
to compile in watch mode, when we sava a file the compiler immedialty elaborates it

npm run compileTs

*/

import { Sort } from './bubbleSort';
import { NumberCollection } from './NumberCollection';
import { CharactersCollection } from './CharactersCollection';

console.log('hi all');

const x = new NumberCollection([0, 10, -1, 5, 344, -7, 9, 0.5, -0.5]);
const sorter = new Sort();
sorter.sort(x);
console.log(x.data);

var cc = new CharactersCollection('La Sui Monti (zzz) Me ne vo');
sorter.sort(cc);
console.log(cc.data);

console.log(sorter.sortBad([0, 10, -1, 5, 344, -7, 9, 0.5, -0.5]));
