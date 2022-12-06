import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K>{
    protected abstract template(): string;
    protected abstract eventsMap(): {[key: string] : () => void} ;  

    //Element is an HTML document
    //private parent: Element  //where to append my html part
    constructor(protected parent:Element, protected model:T){
        this.model.on('change', () =>{
            this.render()
        })
    } 

    render():void{
        this.parent.innerHTML='' //clear before rendering
        const element =document.createElement("template");
        element.innerHTML=this.template()
        this.bindEvents(element.content)
        this.parent.append(element.content)
    }

    private bindEvents(fragment : DocumentFragment): void {
        const eventsMap = this.eventsMap()
        for (let eventKey in eventsMap){
            const [eventName, selector] = eventKey.split(':');
            //eventName --> click
            //selector  --> button
            fragment.querySelectorAll(selector).forEach( element =>{
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }
}