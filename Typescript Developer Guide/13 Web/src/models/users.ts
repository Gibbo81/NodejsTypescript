
//Optional properties fighissime!!!!!!
interface UserProp{
    name?: string,
    age?:number
}

export class User{
    //This must ansolutely be added to my guide the auto generation of property not only work
    //for public one but also for other type as protected
    constructor(private data: UserProp){}

    get(propertyName:string): number|string{
        return this.data[propertyName] // yes in js we can access the obect by the property name
    }
    
    setProperty(propertyName:string, value : number|string): void{
        this.data[propertyName]= value
    }

    set (update : UserProp): void{
        Object.assign(this.data, update) //assign all the property of update to data
    }
}
