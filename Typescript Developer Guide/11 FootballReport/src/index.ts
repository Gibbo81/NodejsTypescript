import {MatchesFileReader} from './MatchesFileReader'
import {CsvFileReader} from './utility/CsvFileReader'

var r = new MatchesFileReader(new CsvFileReader('football.csv'))
var analysis = r.readMatches()

console.log('Man United wins', analysis.numberofWin('Man United'), 'games.')