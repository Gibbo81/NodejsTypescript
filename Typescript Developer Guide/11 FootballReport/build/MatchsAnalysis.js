"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAnalysis = void 0;
class MatchAnalysis {
    constructor(matches, publisher) {
        this.matches = matches;
        this.publisher = publisher;
    }
    numberofWin(team) {
        var result = 0;
        for (let m of this.matches) { //similar to for each...
            if (m.isThisAMatchWonForRequestedTeam(team))
                result = ++result;
        }
        //two possible ways to do it
        // this.matches.forEach(m => {
        //     if (m.matchWon(team)) result = ++result
        // })
        this.publisher.print(`${team} wins ${result} games.`);
    }
}
exports.MatchAnalysis = MatchAnalysis;
