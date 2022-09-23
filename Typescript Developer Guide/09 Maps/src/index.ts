// npm install -g parcel-bundler
//to build the application parcel index.html --> Server running at http://localhost:1234
import faker from 'faker'
import { User } from './User'
import City from './City'   ////default export is possible but is contrary do Typescript convention

console.log('hi there!!!!')
const xcx = new User()
console.log(xcx)
console.log(xcx.name)
//console.log(City)
