"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchesReader_1 = require("./MatchesReader");
const CsvFileReader_1 = require("./utility/CsvFileReader");
const generic_1 = require("./generic/generic");
var r = new MatchesReader_1.MatchesReader(new CsvFileReader_1.CsvFileReader('football.csv'));
var analysis = r.readMatches();
console.log('Man United wins', analysis.numberofWin('Man United'), 'games.');
//generic classes
var n = new generic_1.Holder();
n.data = 199;
var s = new generic_1.Holder();
s.data = '126 planets';
