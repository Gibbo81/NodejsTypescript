//type alias for empty function 
export type Callback = () => void    //alias for a function that doesn't take argument and  return undefined

export class Eventing{
    //definisco questo oggetto ma non so ancora cosa avrà, quindi dico che avrà delle 
    //proprietà caratterizzate da una stringa che puntano ad un array di Callback
    private callBacksEvents : { [key:string] :Callback[]} ={} // it's initialized as empty object

    //used in our framework to register an event
    //trasformed into an array function to avoid problem with this
    on = (eventName: string, callback: Callback) : void =>{
        const events = this.callBacksEvents[eventName] || [] // if the first is undefined retrurn empty array
        events.push(callback)
        this.callBacksEvents[eventName]=events        
    }

    trigger = (eventName:string) : void =>  {
        var cb = this.callBacksEvents[eventName]||[]
        cb.forEach(x => x())
    }
}