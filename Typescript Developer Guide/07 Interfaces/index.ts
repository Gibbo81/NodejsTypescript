//interface creates a new type, describing the property names and value types of an object 

interface Vehicle {
    name : string,
    year : number,
    broken: boolean,
    summary(): string
}

const oldCivic = {
    name:'civic',
    year:2000,
    broken: true,
    summary() : string {
        return `name : ${this.name} and broken: ${this.broken}`
    }//backtick (`) characters is alt + 96  
}

const printVehicle = (car: Vehicle): void=>{
    console.log(car.summary())
}
printVehicle(oldCivic)
//no error even if oldCivic does not explicitly implement the interface
//it only needs to sadisfy the requirement  (properties names and types)
//implement decided on fact and not on declaration

interface Printable {summary(): string}
const drink = {
    gradation: 87,
    color : 'black',
    name: "Moiolos",
    summary():string {
        return `name ${this.name} of color ${this.color} has a alchol gradation ${this.gradation}`
    }
}

const printObject = (o: Printable): void =>  console.log(o.summary())
oldCivic.broken= false
printObject(drink)
printObject(oldCivic)
