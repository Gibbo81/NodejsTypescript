import {Eventing} from './Eventing'
import {ApiSync} from './ApiSync'
import {Attributes} from './Attributes'
import {Model} from './Model'

//Optional properties fighissime!!!!!!
export interface UserProp{
    name?: string,
    age?: number,
    id?: number
}

export class User extends Model<UserProp>{  
    constructor(data: UserProp){ 
        super(new Attributes<UserProp>(data), 
              new ApiSync<UserProp>('http://localhost:3000/users'),
              new Eventing())
    }

 
    /*
    fetchOLD(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response : AxiosResponse):void => {
                 this.set(response.data)
            })
    }

    /////////////////////////////////////////////////////////////////////
    //legacy code deleted before movingg to model.ts
    /////////////////////////////////////////////////////////////////////
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