//to start --> parcel index.html
//to install  npm install -g parcel-bundler
//to start the web server parcel index.html

import {User} from './models/users'

const u = new User({
    name: 'Candida',
    age:55
})
u.setProperty('age', 66)
console.log(u.get('name'))
console.log(u.get('age'))
u.set({ name: 'Francesca'})
console.log(`name:  ${u.get('name')} - age:  ${u.get('age')}`)

u.on('Pippus', ()=>  console.log("tttt"))
u.on('Pippus', ()=>  console.log("9999"))
u.on('plutus', ()=>  console.log("000000"))
console.log(u)
