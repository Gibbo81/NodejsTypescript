//decorators are applied when the code for the class is run not when an instance is crated
//ONLY ONE SINGLE TIME
@classDecorator
class Boat {
    color: string = 'red'

    @logDecoratorTwo
    get formattedColor(): string {
        return `this boat color is ${this.color}`
    }

    //to enable "experimentalDecorators": true and "emitDecoratorMetadata": true inside tsconfig.json
    @logDecorator
    pilot():void {
        throw new Error('OOOOO')
        console.log('Nigerian')
    }

    @logDecoratorFactory('sinks insidethe green ocean')
    pilotTwo():void {
        throw new Error('OOOOO')
        console.log('Nigerian')
    }
}

//wrapping pilot method inside a logger
function logDecorator(target: any, key:string, desc: PropertyDescriptor): void{
    const method = desc.value
    desc.value = function() {
        try{
            method()
        } catch (e){
            console.log('Ops an error sinks the boat')
        }
    }
}
//@testDecorator is exaclty the same as calling directly this method --> logDecorator(Boat.prototype, 'pilot')
//it's only syntactic sugar


//factory uses to take a personalized test, returns the real decorator function but can use external input
//a decorator with parameters :-)
function logDecoratorFactory(errorText:string){
    return function (target: any, key:string, desc: PropertyDescriptor): void{
        const method = desc.value
        desc.value = function() {
            try{
                method()
            } catch (e){
                console.log(errorText)
            }
        }
    }    
}

//you can not decorate properties, you can at most wrap a property in a getter (accessor) and put a decoratr on it 
function logDecoratorTwo(target: any, key:string, desc: PropertyDescriptor): void{
    console.log(key)
}

//class decorate are more or less useless
function classDecorator(constructor: Function){
    console.log(constructor)
}

new Boat().pilot()
new Boat().pilotTwo()