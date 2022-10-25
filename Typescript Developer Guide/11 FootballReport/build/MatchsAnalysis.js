"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAnalysis = void 0;
class MatchAnalysis {
    constructor(matches) {
        this.matches = matches;
    }
    numberofWin(team) {
        var result = 0;
        for (let m of this.matches) { //similar to foe each...
            if (m.isThisAMatchWonForRequestedTeam(team))
                result = ++result;
        }
        //two possible ways to do it
        // this.matches.forEach(m => {
        //     if (m.matchWon(team)) result = ++result
        // })
        return result;
    }
}
exports.MatchAnalysis = MatchAnalysis;
