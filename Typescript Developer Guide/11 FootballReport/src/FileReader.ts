//When working with js standard lib (in this case fs) we need to install a type definition file
//USE: npm install @types/node
//this gives the type definition file for ANY node module
import fs from 'fs';
import { Match } from './Match';
import {MatchAnalysis} from './MatchsAnalysis'


export class Reader {
  private path: string;
  constructor(path: string) {
    this.path = path;
  }

  public readMatches(): MatchAnalysis {
    const matches = fs.readFileSync(this.path, {encoding: 'utf-8'})
      .split('\n')
      .map((row: string): Match => {
        var splitted = row.split(',');
        return new Match(
            new Date(splitted[0]),
            splitted[1],
            splitted[2],
            parseInt(splitted[3]),
            parseInt(splitted[4]),
            splitted[5],
            splitted[6])
      })
    return new MatchAnalysis(matches);
  }

  //TEST  reading command OLD WAY
  public read(): string[][] {
    const fileContent = fs.readFileSync(this.path, {
      //it find the file in the superior folder (11football)
      encoding: 'utf-8',
    });
    /*var test= 'C:/GitRepo/NodejsTypescript/Typescript Developer Guide/11 FootballReport/football.csv'
        const matches2 = fs.readFileSync(test,{ 
            encoding:'utf-8'
        }) It's possible to use absolute path*/
    var result: string[][] = [];
    fileContent
      .split('\n')
      .forEach((x) => (result[result.length] = x.split(',')));
    return result;
  }
}
