
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


//the simplest annotation can be omitted because type can inference the correct type
var age : number =10
var age2 = 10
//for typescript they are exactly the same: both are number only variable
//type inference works only if declaration and inizialization are made in the same line
//some type can not be inferred E.g.: number | null  (nullable number)


