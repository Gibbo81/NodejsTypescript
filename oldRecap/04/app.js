const notes = require('./notes')
const yargs = require('yargs')
    
//run-->  node app.js add
//process.argv contains the array of command line argument
// 1° is always the path to the nodejs executabe
// 2° path to the exeecuted file
console.log(process.argv)
console.log(yargs.argv)
const command = process.argv[2];

if (command === 'add'){
    notes.saveNote('First', 'a note for all')
    notes.saveNote('Second', 'new one')
    notes.saveNote('Last', 'our final hope')
} else if (command === 'remove'){
    notes.removeNote('Second')
}


