import {Reader} from './FileReader'

var r = new Reader('football.csv')
var analysis = r.readMatches()

console.log('Man United wins', analysis.NumberofWin('Man United'), 'games.')