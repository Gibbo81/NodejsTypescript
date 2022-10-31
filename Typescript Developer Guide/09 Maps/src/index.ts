// npm install -g parcel-bundler
//to build the application parcel index.html --> Server running at http://localhost:1234
import faker from 'faker'
import { User } from './User'
import { Company } from './Company'
import { printMe } from './printable'
import City from './defaultBAD'   //default export is possible but is contrary do Typescript convention

console.log('hi there!!!!')
const xcx = new User()
console.log(xcx)
const comp = new Company()
console.log(comp)
//console.log(City)


var fun = function(x : Company | User):void{
    x.location = {lat: "", lng:''}
    x.name = 'pippo'
    //x can have only this 2 properies because are the only present both in User class and Company class
    //TS blocks out all the other 
}

//dependency inversion principle is usefull in javascript and is really simple to implement
//interface implementation is implicit (implicit type check) and not explicit (you do not need to declare that you are implementating an interface)
printMe(xcx)
printMe(comp)

// explicit implementation inside Company.ts