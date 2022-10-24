"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchesFileReader_1 = require("./MatchesFileReader");
const CsvFileReader_1 = require("./utility/CsvFileReader");
var r = new MatchesFileReader_1.MatchesFileReader(new CsvFileReader_1.CsvFileReader('football.csv'));
var analysis = r.readMatches();
console.log('Man United wins', analysis.numberofWin('Man United'), 'games.');
