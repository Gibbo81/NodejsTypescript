const externalUser = require('./utils.js')
const getNotes = require('./note.js')

const name = 'Pippus'
console.log(name)
console.log('external user' + externalUser.name + ' - '+ externalUser.surname + ' - '+ externalUser.age )
console.log('Add 2 and 4: ' + externalUser.add(2,4) ) 
console.log('Second Add 2 and 4: ' + externalUser.add2(2,4) ) 
console.log(getNotes() ) 