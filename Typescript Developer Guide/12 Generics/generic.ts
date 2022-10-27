export class ArrayGeneric<T>{
    constructor(public collection: T[]){}

    public get(index:number) :T{
        return this.collection[index]
    }
}


const i= new ArrayGeneric(['y','U','i']) //implict definition of T as string (type inference)

function printAnythingh<T>(arr :T[]):void{
    arr.forEach(x => { console.log(x) });
}

printAnythingh([1,4,6,7,9])
printAnythingh(['ui','iy'])

//////////////////////////////////////////////////

class Car {
    print():void {
        console.log('I am a car')
    }
}

class House {
    print():void {
        console.log('I am a house')
    }
}

interface Printable{
    print():void ;
}

function printThePrintable<T extends Printable>(arr: T[]){
    arr.forEach(x => { x.print() });    
}

printThePrintable([new House(), new House(), new Car])
//T is of type Printable so i can have mixed array 

printThePrintable<Car>([new House(),new Car])
//Anche così funziona non molto intuitivo ma di certo non si può rompere a run time