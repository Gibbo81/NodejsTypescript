const yargs = require('yargs')
const fs = require('fs')
//run-->  node app.js add
//process.argv contains the array of command line argument
// 1° is always the path to the nodejs executabe
// 2° path to the exeecuted file
console.log(process.argv)
console.log(yargs.argv)
const command = process.argv[2];

if (command === 'add'){
    console.log('adding note')
} else if (command === 'remove'){
    console.log('remove note')
}


//Json
var book ={
    title :'the coach',
    author : 'jhon risham'
}
var bookJson =JSON.stringify(book)
console.log(bookJson)
fs.writeFileSync('1-json.json', bookJson)
var dataBuffer = fs.readFileSync('1-json.json')
var parseBook = JSON.parse(dataBuffer.toString())
console.log(parseBook.author)

dataBuffer = fs.readFileSync('test.json')
var parseobject = JSON.parse(dataBuffer.toString())
parseobject.name ='Pippus'
parseobject.age = 657
fs.writeFileSync('test.json', JSON.stringify(parseobject))
