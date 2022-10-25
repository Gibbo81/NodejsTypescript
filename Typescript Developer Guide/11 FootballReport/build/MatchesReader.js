"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesReader = void 0;
//When working with js standard lib (in this case fs) we need to install a type definition file
//USE: npm install @types/node
//this gives the type definition file for ANY node module
const fs_1 = __importDefault(require("fs"));
const Match_1 = require("./Match");
const MatchsAnalysis_1 = require("./MatchsAnalysis");
const utils_1 = require("./utility/utils");
class MatchesReader {
    constructor(reader, publisher) {
        this.sourceReader = reader;
        this.publisher = publisher;
    }
    readMatches() {
        var matches = this.sourceReader
            .Read()
            .map((row) => new Match_1.Match((0, utils_1.dateStringToDate)(row[0]), row[1], row[2], parseInt(row[3]), parseInt(row[4]), row[5], //how to cast to enum 
        row[6]));
        return new MatchsAnalysis_1.MatchAnalysis(matches, this.publisher); //ConsolePublisher())
    }
    //TEST  reading command OLD WAY
    read() {
        const fileContent = fs_1.default.readFileSync('football.csv', {
            //it find the file in the superior folder (11football)
            encoding: 'utf-8',
        });
        /*var test= 'C:/GitRepo/NodejsTypescript/Typescript Developer Guide/11 FootballReport/football.csv'
            const matches2 = fs.readFileSync(test,{
                encoding:'utf-8'
            }) It's possible to use absolute path*/
        var result = [];
        fileContent
            .split('\n')
            .forEach((x) => (result[result.length] = x.split(',')));
        return result;
    }
}
exports.MatchesReader = MatchesReader;
