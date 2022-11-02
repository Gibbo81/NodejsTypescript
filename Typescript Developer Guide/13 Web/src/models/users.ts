
//Optional properties fighissime!!!!!!
interface UserProp{
    name?: string,
    age?:number
}

//type alias for empty function 
type Callback = () => void    //alias for a function that doesn't take argument and  return undefined

export class User{
    private callBacksEvents : { [key:string] :Callback[]} ={}

    constructor(private data: UserProp){   }

    get(propertyName:string): number|string{
        return this.data[propertyName] // yes in js we can access the obect by the property name
    }
    
    set (update : UserProp): void{
        Object.assign(this.data, update) //assign all the property of update to data
    }

    //used in our framework to register an event
    on(eventName: string, callback: Callback) : void{
        const events = this.callBacksEvents[eventName] || [] // if the first is undefined retrurn empty array
        events.push(callback)
        this.callBacksEvents[eventName]=events
    }

    setProperty(propertyName:string, value : number|string): void{
        this.data[propertyName]= value
    }


}
