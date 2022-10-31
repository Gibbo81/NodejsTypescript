import { Match } from './Match';

export interface Ipublisher{
    print(report: string): void
}

export class MatchAnalysis{
    private matches : Match[]
    private publisher : Ipublisher

    constructor(matches :Match[], publisher : Ipublisher){
        this.matches = matches
        this.publisher = publisher
    }

    public numberofWin(team: string): void{
        var result=0
        for (let m of this.matches){   //similar to for each...
            if (m.isThisAMatchWonForRequestedTeam(team)) result = ++result
        }
        //two possible ways to do it
        // this.matches.forEach(m => {
        //     if (m.isThisAMatchWonForRequestedTeam(team)) result = ++result
        // })
        this.publisher.print(`${team} wins ${result} games.`)
    }
}