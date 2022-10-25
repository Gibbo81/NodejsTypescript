import {MatchesReader} from './MatchesReader'
import {CsvFileReader} from './utility/CsvFileReader'
import {Holder} from './generic/generic'

var r = new MatchesReader(new CsvFileReader('football.csv'))
var analysis = r.readMatches()

console.log('Man United wins', analysis.numberofWin('Man United'), 'games.')

//generic classes
var n = new Holder<number>()
n.data=199
var s = new Holder<string>()
s.data='126 planets'
