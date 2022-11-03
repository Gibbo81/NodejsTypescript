import axios, {AxiosPromise, AxiosResponse} from 'axios'

//Optional properties fighissime!!!!!!
interface UserProp{
    name?: string,
    age?: number,
    id?: number
}

//type alias for empty function 
type Callback = () => void    //alias for a function that doesn't take argument and  return undefined

export class User{
    //definisco questo oggetto ma non so ancora cosa avrà, quindi dico che avrà delle 
    //proprietà caratterizzate da una stringa che puntano ad un array di Callback
    private callBacksEvents : { [key:string] :Callback[]} ={} // it's initialized as empty object

    constructor(private data: UserProp){ }

    get(propertyName:string): number|string{
        return this.data[propertyName] // yes in js we can access the obect by the property name
    }
    
    set (update : UserProp): void{//TO ADD
        Object.assign(this.data, update) //assign all the property of update to data
    }

    //used in our framework to register an event
    on(eventName: string, callback: Callback) : void{
        const events = this.callBacksEvents[eventName] || [] // if the first is undefined retrurn empty array
        events.push(callback)
        this.callBacksEvents[eventName]=events        
    }

    trigger(eventName:string) : void {
        var cb = this.callBacksEvents[eventName]||[]
        cb.forEach(x => x())
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