//to start --> parcel index.html
//to install  npm install -g parcel-bundler
//to start the web server parcel index.html

//to install globally json server
//npm install -g json-server
//simple fake server to save and retrive json
//to start it --> json-server -w db.json

import {User} from './models/users'
import {testing} from './try/try-out'

const u = new User({
    name: 'Candida',
    age:55
})
u.setProperty('age', 66)
console.log(u.get('name'))
console.log(u.get('age'))
u.set({ name: 'Francesca'})
console.log(`name:  ${u.get('name')} - age:  ${u.get('age')}`)

u.on('Pippus', () =>  console.log("Pippu2 1: tttt"))
u.on('Pippus', () =>  console.log("Pippu2 2: 9999"))
u.on('plutus', () =>  console.log("000000"))
console.log(u)
u.trigger('Pippus')
u.trigger('Missing')

const newUser = new User({
    name: 'Candida',
    age : 26 
})
newUser.save()
delay(4000).then(() => {
    newUser.set({ name: 'Candida', age : 27})
    newUser.save()    
});


/*
const newUserFromDB = new User({id:1})  //previosly added user 1 to DB by postman
newUserFromDB.fetch()
*/


testing()


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  