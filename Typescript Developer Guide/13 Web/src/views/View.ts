import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K>{
    protected regions :{[key: string]: Element} = {}

    protected abstract template(): string;

    protected eventsMap(): { [key: string]: () => void } {
       return {}
    }

    protected regiosnMap():{[key: string]: string}{
        return {}
    }

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
        this.mapRegions(element.content)

        this.onRender()

        this.parent.append(element.content)
    }

    protected onRender(): void {}

    private mapRegions(fragment: DocumentFragment) :void {
        const regionMap= this.regiosnMap()
        for (let key in regionMap){
            const selector= regionMap[key]
            const element =fragment.querySelector(selector)
            if (element)
                this.regions[key]= element
        }
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