import axios, {AxiosResponse} from 'axios'
import {UserProp} from './users'


export class Sync{
    //http://localhost:3000/users --> address
    constructor(private routeUrl:string){}

    //my solution, the course doesn't like it
    async fetch(id: number): Promise<UserProp> {
        var x = await axios.get(`${this.routeUrl}/${id}`)
        var d =  x.data as UserProp; 
        return d;
    }

    async save(data: UserProp): Promise<UserProp> {
        if (data.id){
            var response= await axios.put(`${this.routeUrl}/${data.id}`, data)                
            return response.data as UserProp; 
        }            
        else
        { //json server put is bugged (it returns 404 if the resource is not present)
            var response = await axios.post(this.routeUrl, data)
            return response.data as UserProp; 
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