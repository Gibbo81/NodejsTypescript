
const drink ={
    color: 'red',
    carbonate: true,
    sugar: 40
    
}



//lets use a tuple instead of an object
const pepsi:[string, boolean, number] =['red', true, 40]
//instad of defining an array :  (string | number | null)[] 
//we describe the specific order of type of element: pepsy must have a string first then a boolean and last a number
pepsi[0] ='blu'
//pepsi[1] ='blu' ERROR
//pepsi[3] ='blu' ERROR
console.log(pepsi)


//types
type Car = [string, number] //brand new type used to define a tuple mutiple time
const punto: Car= ["punto", 12.000]
const bravo: Car= ["bravo", 17.000]

//NOT SO USABLE 
//difficult to read and intepret in the correct way because the name of the field is not explicit inside the object
//better to use object