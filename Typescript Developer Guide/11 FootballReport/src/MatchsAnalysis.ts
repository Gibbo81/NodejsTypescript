import { Match } from './Match';


export class MatchAnalysis{
    private matches : Match[]

    constructor(matches :Match[]){
        this.matches = matches
    }

    public numberofWin(team: string): number{
        var result=0
        this.matches.forEach(m => {
            if (m.matchWon(team)) result = ++result
        })
        return result
    }
}