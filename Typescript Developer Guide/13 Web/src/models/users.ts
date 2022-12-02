import {Eventing} from './Eventing'
import {ApiSync} from './ApiSync'
import {Attributes} from './Attributes'
import {Model} from './Model'
import { Collection } from './Collection'

//Optional properties fighissime!!!!!!
export interface UserProp{
    name?: string,
    age?: number,
    id?: number
}

export class User extends Model<UserProp>{  
    private static url: string = 'http://localhost:3000/users'

    constructor(data: UserProp){ 
        super(new Attributes<UserProp>(data), 
              new ApiSync<UserProp>(User.url),
              new Eventing())
    }

    static buildUsersCollection(): Collection<User, UserProp>{
        return new Collection(new ApiSync<UserProp>(User.url), 
                              x => new User(x))
    }
    /*

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