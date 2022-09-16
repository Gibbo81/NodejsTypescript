

const carMakers : string[] = []
const carMakers2 = ['ford', 'fiat', 'toyota'] //in this case is not necesary, inference is enuoght
console.log(carMakers)


const pippus : { x:number; y:number}[] = [
    {x : 12, y:554}, 
    {x : 96, y:-85.5}
]
console.log(pippus)

var x = carMakers[1] //x is a string, thank to type inference
//carMakers.push(100) //this is an error: Argument of type 'number' is not assignable to parameter of type 'string'.

//we can still have mixed array types, usind an explixit declaration
const mixed : (string | number | null)[] = ['print', -75675, 2335.4,  "taram"]
mixed.push(null)
console.log(mixed) 