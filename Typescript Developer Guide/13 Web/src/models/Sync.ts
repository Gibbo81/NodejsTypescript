import axios, {AxiosResponse} from 'axios'
//import {UserProp} from './users'

interface hasId {
    id?: number;
}

export class Sync<T extends hasId>{
    //http://localhost:3000/users --> address
    constructor(private routeUrl:string){}

    //my solution, the course doesn't like it
    async fetch(id: number): Promise<T> {
        var x = await axios.get(`${this.routeUrl}/${id}`)
        var d =  x.data as T; 
        return d;
    }

    async save(data: T): Promise<T> {
        const {id} = data
        if (id){
            var response= await axios.put(`${this.routeUrl}/${id}`, data)                
            return response.data as T; 
        }            
        else
        { //json server put is bugged (it returns 404 if the resource is not present)
            var response = await axios.post(this.routeUrl, data)
            return response.data as T; 
        }
    }   

    // fetch(): void {
    //     axios.get(`http://localhost:3000/users/${this.get('id')}`)
    //         .then((response : AxiosResponse):void => {
    //              this.set(response.data)
    //         })
    // }

    // save(): void {
    //     const id = this.get('id')
    //     if (id)
    //         axios.put(`http://localhost:3000/users/${id}`, this.data)                
    //     else
    //     { //json server put is bugged (it returns 404 if the resource is not present)
    //         axios.post(`http://localhost:3000/users`, this.data)
    //                 .then((response : AxiosResponse):void => {
    //                     this.set(response.data)
    //             })    
    //     }
    // }   
}