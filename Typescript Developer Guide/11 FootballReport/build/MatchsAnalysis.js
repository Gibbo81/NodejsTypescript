"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAnalysis = void 0;
class MatchAnalysis {
    constructor(matches) {
        this.matches = matches;
    }
    numberofWin(team) {
        var result = 0;
        this.matches.forEach(m => {
            if (m.matchWon(team))
                result = ++result;
        });
        return result;
    }
}
exports.MatchAnalysis = MatchAnalysis;
