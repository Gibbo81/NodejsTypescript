//import{Callback} from './Eventing'


interface IModelAttribute<T extends {}>{
    get<K extends keyof T>(key : K): T[K],
    set(update : T): void,
    getAll() : T
}

interface ISync<T extends {id?: number }>{
    fetch(id: number): Promise<T>,
    save(data: T): Promise<T>
}

interface IEvents{
    //on(eventName: string, callback: Callback) : void,
    on(eventName: string, callback: () => void) : void, //quack rule
    trigger(eventName:string) : void
}


export class Model{

}