import {User} from './users'
import {Eventing} from './Eventing'
import {IEvents} from './Model'
import { ApiSync } from './ApiSync'
import { UserProp } from './users'

// t === User
// k = UserProp
export class Collection<T, K>{
    private _models : T[] = []
    private events : IEvents = new Eventing()
    
    constructor(private sync: ApiSync<K>, private deserialize : (json :K) => T){}
    
    get models(): T[] {
        return this._models
    }

    async fetch(): Promise<void>{
        var data = await this.sync.fetchAll()
        this._models = []
        data.forEach(u => this._models.push(this.deserialize(u))) //necessary when working with generic
        //we need a new indirettism layer to cross the bridge between T and K
        this.trigger('changes')
    }

    on(eventName: string, callback: () => void){
        this.events.on(eventName, callback)
    }
    trigger(eventName: string){
        this.events.trigger(eventName)
    }
}