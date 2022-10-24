"use strict";
//https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
//Just go to tsconfig.json and set
// "compilerOptions": {
//     "strictPropertyInitialization": false,
// Otherwise you need to initialize all your variables which is a little bit annoying
Object.defineProperty(exports, "__esModule", { value: true });
exports.Holder = void 0;
class Holder {
}
exports.Holder = Holder;
var n = new Holder();
n.data = 99;
var s = new Holder();
s.data = '126 starts';
