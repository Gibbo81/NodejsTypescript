"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAnalysis = void 0;
class MatchAnalysis {
    constructor(matches) {
        this.matches = matches;
    }
    NumberofWin(team) {
        var result = 0;
        this.matches.forEach(m => {
            if (m.MatchWon(team))
                result = ++result;
        });
        return result;
    }
}
exports.MatchAnalysis = MatchAnalysis;
