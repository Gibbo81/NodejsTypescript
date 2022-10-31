
class Mouse{
    color:string
    private type: string                
    constructor(color:string, type: string,){
        this.color=color
        this.type = type
    }
}


class Vehicle{
    originalColor:string                
    constructor(color:string, public length: number, private width: number){
        this.originalColor=color
    }
    //we need to declare the property before initializing it inside the constructor (different from js)
    //", public length: number" automatically create a public properties length and assign the value 
    //we can use private or protected as well

    IsUnder(value: number) : boolean {
        return this.length<value
    }

    drive() : void {
        console.log('Brum Brum')
    }

    protected honk() : void {
        console.log('Beeep!!!!')
    }
}

class Car extends Vehicle{
    
    //we add a new property wheels fo the subclass
    //IMPORTANT we do not use public for color because we do not want to override the property of the base class
    //but only ask for a falue to assign
    constructor(public wheels: number, color:string, length: number,  width: number){
        super(color, length, width)
    }
    
    drive() : void {    //override
        this.startEngene()
        console.log('Car is running')
        this.honk()
    }

    //default is public to change it we can use private and protected
    private startEngene() : void{
        console.log('starting the engine')
    }
}

const panda= new Car(4, "red", 200, 30)

panda.drive()
console.log(panda.IsUnder(201))