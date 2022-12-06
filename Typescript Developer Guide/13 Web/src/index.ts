//to start --> parcel index.html
//to install  npm install -g parcel-bundler
//to start the web server: parcel index.html

//to install globally json server
//npm install -g json-server
//simple fake server to save and retrive json
//to start it --> json-server -w db.json

//tsconfig.json --> "strict": false, || Disable some hard integrity check - e.g. null check

import {User} from './models/users'
import { UserForm } from './views/UserForm'
import { UserEdit } from './views/UserEdit'

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
.then((result: void) => console.log(u))
.then(r => console.log(u.get('id')))

const u2 = new User({ id :2})
u2.fetch()
.then((x: void) => console.log(u2))


var c = User.buildUsersCollection();
c.on('changes', () => console.log(`changes trigger date: ${JSON.stringify(c.models)}`))

c.fetch()
//.then(() => console.log(`date: ${JSON.stringify(c.models)}`))

const toShow = new User({
    name: 'Mirian Leprin',
    age: 52
})
/*
partial Form Tests removed after UserEdit
const form = new UserForm(document.getElementById('root'), toShow)
form.render()
*/

const ue = new UserEdit(document.getElementById('root'), toShow)
ue.render()
console.log(ue)
//OLD tests
//testing()

// function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
//   }
  