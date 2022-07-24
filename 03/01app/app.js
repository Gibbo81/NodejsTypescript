const fs = require('fs');

fs.writeFileSync('note.txt',  '1 2 3 star V2\n')
fs.appendFileSync('note.txt', '5 6 7 all on the grount')