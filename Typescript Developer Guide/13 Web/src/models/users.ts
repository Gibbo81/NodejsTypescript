
import axios, {AxiosPromise, AxiosResponse} from 'axios'
import {Eventing, Callback} from './Eventing'
import {Sync} from './Sync'
import {Attributes} from './Attributes'

//Optional properties fighissime!!!!!!
export interface UserProp{
    name?: string,
    age?: number,
    id?: number
}

export class User{  
    private events : Eventing = new Eventing()
    private sync : Sync<UserProp> = new Sync<UserProp>('http://localhost:3000/users')
    private attribute :Attributes<UserProp> 

    constructor(data: UserProp){ 
        this.attribute = new Attributes(data) //type is automatically inferred
    }

    get(propertyName:keyof UserProp): number|string{
        return this.attribute.get(propertyName)
    }    
    set (update : UserProp): void{
        this.attribute.set(update)
    }


    //this works
    onold(eventName: string, callback: Callback) : void{
        this.events.on(eventName, callback)
    }
    get on(){ //but because is a SIMPLE PAPERPUSHER we can return back directly the function from the private object
        return this.events.on
    } //but we can have problem with this for this reason we trasform ecents.on into arrow function
    trigger(eventName:string) : void {
        this.events.trigger(eventName)
    }


    async fetch(): Promise<void> {
        if (this.attribute.get("id")){
            var x = await this.sync.fetch(this.attribute.get("id"))
            this.set(x)
        }
        else
            throw new Error("Missing Id")
    }
    async save(): Promise<void> {
        var data = await this.sync.save({
            id : this.attribute.get("id"),
            name :this.attribute.get("name"),
            age : this.attribute.get("age")
        })     
        this.set(data)    
    }

    /*
    fetchOLD(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response : AxiosResponse):void => {
                 this.set(response.data)
            })
    }
    //legacy code
    saveOLD(): void {
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
    }*/
}