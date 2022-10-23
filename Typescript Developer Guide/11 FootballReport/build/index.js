"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileReader_1 = require("./FileReader");
var r = new FileReader_1.Reader('football.csv');
var analysis = r.readMatches();
console.log('Man United wins', analysis.NumberofWin('Man United'), 'games.');
