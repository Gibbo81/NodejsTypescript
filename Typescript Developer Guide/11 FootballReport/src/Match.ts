export enum MatchResult  { //also loock at MatchesFileReader.ts to see enu,m casting
    homeWin ='H',
    awayWin = 'A',
    draw = 'D'
}

export class Match {
    constructor(
        public Date: Date,
        public HomeTeam: string,
        public AwaiTeam: string,
        public Homescore: number,
        public AwaiScore: number,
        public Winner: MatchResult,
        public Referee: string) {}

    public matchWon(team: string): boolean{
        return ( this.isHomeWinningForTeam(team)) || ( this.IsAwayWinningForTeam(team))
    }

    private IsAwayWinningForTeam(team: string): boolean {
        return this.AwaiTeam === team && this.Winner === MatchResult.awayWin
    }

    private isHomeWinningForTeam(team: string): boolean {
        return this.HomeTeam === team && this.Winner === MatchResult.homeWin
    }
}
