import {MatchesReader} from './MatchesReader'
import {CsvFileReader} from './utility/CsvFileReader'
import {Holder} from './generic/generic'
import {ConsolePublisher} from './reports/ConsolePublisher'
import {HtmlPublisher} from './reports/HtmlReport'


const console= new ConsolePublisher()
const html = new HtmlPublisher()

var r1 = new MatchesReader(new CsvFileReader('football.csv'), console)
var analysis1 = r1.readMatches()
analysis1.numberofWin('Man United')

var r2 = new MatchesReader(new CsvFileReader('football.csv'), html)
var analysis2 = r2.readMatches()
analysis2.numberofWin('Man United')

//generic classes
var n = new Holder<number>()
n.data=199
var s = new Holder<string>()
s.data='126 planets'
