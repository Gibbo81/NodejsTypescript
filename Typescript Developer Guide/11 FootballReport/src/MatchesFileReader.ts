//When working with js standard lib (in this case fs) we need to install a type definition file
//USE: npm install @types/node
//this gives the type definition file for ANY node module
import fs from 'fs';
import { Match, MatchResult } from './Match';
import {MatchAnalysis} from './MatchsAnalysis'
import {dateStringToDate} from './utility/utils'

interface IReader {
  Read(): string[][]
}

export class MatchesFileReader {
  private sourceReader: IReader;
  constructor(reader: IReader) {
    this.sourceReader = reader;
  }

  public readMatches(): MatchAnalysis {
    var matches= this.sourceReader
      .Read()
      .map((row: string[]): Match => new Match(
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult, //how to cast to enum 
        row[6]))
    return new MatchAnalysis(matches);
  }

  //TEST  reading command OLD WAY
  public read(): string[][] {
    const fileContent = fs.readFileSync('football.csv', {
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
