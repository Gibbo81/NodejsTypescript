import { Match } from './Match';


export class MatchAnalysis{
    private matches : Match[]

    constructor(matches :Match[]){
        this.matches = matches
    }

    public numberofWin(team: string): number{
        var result=0
        for (let m of this.matches){   //similar to foe each...
            if (m.isThisAMatchWonForRequestedTeam(team)) result = ++result
        }
        //two possible ways to do it
        // this.matches.forEach(m => {
        //     if (m.matchWon(team)) result = ++result
        // })
        return result
    }
}