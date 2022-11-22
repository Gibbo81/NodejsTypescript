export class Attributes<T extends {}>{

    constructor(private data: T){ }

    //video 13.29 extreme use of generic 
    get<K extends keyof T>(key : K): T[K]{
        return this.data[key]                   //as in js we can access the obect by the property name
    }
/*
<K extends keyof T> -> K can only be one of the keys of T. string can be type 
(key : K): T[K]     -> key can only be one of the T's keys so we can be sure of the return value (taken from T) 

*/

set (update : T): void{//TO ADD
        Object.assign(this.data, update) //assign all the properties present inside update object to data object
    }
}


//Test code: remoce comments to check types
/*
import { UserProp } from "./users"

const attrs = new Attributes<UserProp>({
        name : 'pippus',
        age: 36,
        id: 99})
var name = attrs.get('name');           //this is string or undefined
//var name2 = attrs.get('name2');         //this gives error because name2 is not part of UserProp
var idx = attrs.get('id')
//name is of type string|undefined if inside ts.confis put "strict": false, it is only string because the compiler thinks that all is correctly initialized
//The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. 
*/


