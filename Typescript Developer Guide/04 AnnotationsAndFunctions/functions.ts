//function annotation and inference

//types of argumenta AND type of return
//type inference only works for the returning value  

//function annotation take 2 number and return a number
var add = (a: number, b: number) : number =>  a+b

const add2 = (a: number, b: number) =>  a+b
//add and add2 are equivalent for typescript: both return an integer
//ts is capeble to inference the value for the return value

add = add2  //not an error

//bug + inference === return void:
const add3 = (a: number, b: number) =>  {
    a+b //function return void
}
//always specify the return value, in this way ts is able to check on our code


function divide(a:number, b:number): number{
    return a/b
}



//a particula returning value is never
const neverCompleed = (x : string) : never => {
    throw new Error(x)    
} //to indicate that we are NEVER going to reach the end of this function (maybe not so usefull)

//Destructuring and annotation on the same function
var person = {
    age : 56,
    name:'Plutus'
}  

const logPerson = ({age, name} : { age: number, name:string}) : void =>{
    console.log('age: ', age)
    console.log('name: ', name)
}
logPerson(person)


//complex object
const profile ={
    name :'plutus' as string | null,
    age: 65,
    coords: {
        lat:6,
        long:44
    },
    ageing(x: number):void {
        this.age = age + x
    }
}
//destructuring
const { age } : { age: number } = profile
console.log('name: ', age)
const { coords : {lat, long} } : { coords : {lat: number, long:number} } = profile
console.log('lat: ', lat)
console.log('long: ', long)