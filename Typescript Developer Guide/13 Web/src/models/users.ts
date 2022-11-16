
import axios, {AxiosPromise, AxiosResponse} from 'axios'
import {Eventing, Callback} from './Eventing'

//Optional properties fighissime!!!!!!
export interface UserProp{
    name?: string,
    age?: number,
    id?: number
}

export class User{  
    private events : Eventing = new Eventing()

    constructor(private data: UserProp){ }

    on(eventName: string, callback: Callback) : void{
        this.events.on(eventName, callback)
    }

    trigger(eventName:string) : void {
        this.events.trigger(eventName)
    }

    get(propertyName:string): number|string{
        return this.data[propertyName] // yes, as in js we can access the obect by the property name
    }
    
    set (update : UserProp): void{//TO ADD
        Object.assign(this.data, update) //assign all the properties present inside update object to data object
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response : AxiosResponse):void => {
                 this.set(response.data)
            })
    }

    save(): void {
        const id = this.get('id')
        if (id)
            axios.put(`http://localhost:3000/users/${id}`, this.data)                
        else
        { //json server put is bugged (it returns 404 if the resource is not present)
            axios.post(`http://localhost:3000/users`, this.data)
                    .then((response : AxiosResponse):void => {
                        this.set(response.data)
                })    
        }
    }

    setProperty(propertyName:string, value : number|string): void{
        this.data[propertyName]= value
    }
}