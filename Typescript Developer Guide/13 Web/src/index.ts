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
    name: 'caffè cold',
    age: 2158
})
u.on('Pippus', () =>  console.log("Pippu2 1: tttt"))
u.on('Pippus', () =>  console.log("Pippu2 2: 9999"))
u.on('change', () =>  console.log("User was changed"))
console.log(u)
u.trigger('Pippus')
u.trigger('')

u.set({ age:77}) //this should trigger change

u.save()
.then(result => console.log(u))
.then(r => console.log(u.get('id')))

const u2 = new User({ id :2})
u2.fetch()
console.log(u2)

/* OLD TESTS
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
newUser.saveOLD()
delay(4000).then(() => {
    newUser.set({ name: 'Candida', age : 27})
    newUser.saveOLD()    
});
*/
/*
const newUserFromDB = new User({id:1})  //previosly added user 1 to DB by postman
newUserFromDB.fetchOLD()
*/


testing()


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  