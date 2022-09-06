const method = require('./usingC1')
const classt = require('./usingC1Class')

//pippo().then(() => console.log('DONE!'))
pippoClass().then(() => console.log('DONE!'))

async function pippo(){
    var result = await method(10,54)
    console.log(result)
}

async function pippo(){
    var result = await method(10,54)
    console.log(result)
}

async function pippoClass(){    
    var result = await classt(88,2)
    console.log(result)
}