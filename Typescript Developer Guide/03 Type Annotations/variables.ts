
//": number" is a type annotation
let speed : string ='fast' 
var apple : number | null | undefined = 5 //nullable and undefinable variable
apple = null
apple = 67.14
apple = undefined
//apple = 'd' this would give an error

var notmuch : null = null 

//array 
let numbers : number[] = [1,5,9,6]
console.log(numbers)


interface Employee{
    id: number;
    name: string;
    salary: number | null;
 }
 
 // Both cases are valid
 let employe1: Employee = { id: 1, name: 'John', salary: 100 };
 let employe2: Employee = { id: 1, name: 'John', salary: null };
 console.log(employe1)
 console.log(employe2) 
 let e : Employee[] = []

class Car {}
const car : Car = new Car()

//literal Object
var literalPoint : { x:number; y:number} = {
    x :23,
    y :50
}
//literalPoint.z=98 this would be an error
console.log(literalPoint)

// Function  
//void means the function does not return a value (in reality as JS it will return undefined)
const logNumber: (i:number, u:number) => void = (i, u) => {
    console.log("first: ",i)
    console.log("second: ",u)
} 
const v = logNumber(3, 5)
console.log(v) //this is undefined
//important note: we are not annotation the function but the variable logNumber
//saing that it accet a function of certain type 
//Function annotation will be in next chapter


//the simplest annotation can be omitted because type can inference the correct type
var age : number =10
var age2 = 10
//for typescript they are exactly the same: both are number only variable
//type inference works only if declaration and inizialization are made in the same line
//some type can not be inferred E.g.: number | null  (nullable number)
//Whene to use annotations (because inference is not enought)

//1) when a function return any type  E.g.:JSON.Parse(x) because can return different data types
//'any' is a type as string or number but typescript has not idea what that is, always avoid any variables
//we must avoid that the variable conteining the function result is of type any
const json = '{ "x": 10, "y":43}'
const coordinate = JSON.parse(json) as Point
console.log(coordinate)
coordinate.y=89
console.log(coordinate)
//coordinate.z=98 this would give back an error
interface Point{
    x:number,
    y:number
}

//other possibility
const coordinate2 : { x:number; y:number} = JSON.parse(json) as Point
console.log('coordinate2: ',coordinate)

//2) Delayed initialization
var pippo = [1,5,6]
let found : boolean
for(let x=0; x<pippo.length; x++){
    if(pippo[x]===5)
        found=true
}
//found is any if not specified with an annotation

//3) variable whose type cannot be inferred E.g: nullabe integer

const findOrNull: (u:number) => number | null  = (u) => {
    const values = [100,200,300,500]
    for(let i=0; i<values.length; i++)
        if (u===values[i])
            return i
    return null
}
var r1= findOrNull(200)
var r2= findOrNull(202)
console.log(r1)
console.log(r2)