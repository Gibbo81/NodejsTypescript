"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
//When working with js standard lib (in this case fs) we need to install a type definition file
//USE: npm install @types/node
//this gives the type definition file for ANY node module
const fs_1 = __importDefault(require("fs"));
const Match_1 = require("./Match");
const MatchsAnalysis_1 = require("./MatchsAnalysis");
class Reader {
    constructor(path) {
        this.path = path;
    }
    readMatches() {
        const matches = fs_1.default.readFileSync(this.path, { encoding: 'utf-8' })
            .split('\n')
            .map((row) => {
            var splitted = row.split(',');
            return new Match_1.Match(new Date(splitted[0]), splitted[1], splitted[2], parseInt(splitted[3]), parseInt(splitted[4]), splitted[5], splitted[6]);
        });
        return new MatchsAnalysis_1.MatchAnalysis(matches);
    }
    //TEST  reading command OLD WAY
    read() {
        const fileContent = fs_1.default.readFileSync(this.path, {
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
exports.Reader = Reader;
