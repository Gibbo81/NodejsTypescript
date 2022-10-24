"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = exports.MatchResult = void 0;
var MatchResult;
(function (MatchResult) {
    MatchResult["homeWin"] = "H";
    MatchResult["awayWin"] = "A";
    MatchResult["draw"] = "D";
})(MatchResult = exports.MatchResult || (exports.MatchResult = {}));
class Match {
    constructor(Date, HomeTeam, AwaiTeam, Homescore, AwaiScore, Winner, Referee) {
        this.Date = Date;
        this.HomeTeam = HomeTeam;
        this.AwaiTeam = AwaiTeam;
        this.Homescore = Homescore;
        this.AwaiScore = AwaiScore;
        this.Winner = Winner;
        this.Referee = Referee;
    }
    matchWon(team) {
        return (this.isHomeWinningForTeam(team)) || (this.IsAwayWinningForTeam(team));
    }
    IsAwayWinningForTeam(team) {
        return this.AwaiTeam === team && this.Winner === MatchResult.awayWin;
    }
    isHomeWinningForTeam(team) {
        return this.HomeTeam === team && this.Winner === MatchResult.homeWin;
    }
}
exports.Match = Match;
