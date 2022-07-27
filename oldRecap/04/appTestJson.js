const fs = require('fs')

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
parseobject.age = 47
fs.writeFileSync('test.json', JSON.stringify(parseobject))
