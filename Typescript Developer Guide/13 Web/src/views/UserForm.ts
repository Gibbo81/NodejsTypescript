 import { User } from "../models/users"
 
 export class UserForm{
    //Element is an HTML document
    //private parent: Element  //where to append my html part
    constructor(private parent:Element, private model:User){
        this.model.on('change', () =>{
            this.render()
        })
    } 

    private eventsMap(): {[key: string] : () => void} {
        return {
            'click:.set-age': this.onSetAgeClick,    //event handler: click event on the button
            'mouseenter:h1' : this.onH1Hover
        }
    }

    private onSetAgeClick = ():void => {
        this.model.setRandomAge()
        console.log('Age Button was clicked')
        console.log(this.model)
    }

    private onH1Hover() : void{
        console.log('Overing over H1')
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

    private template(): string{
        return `
        <div>
            <h1>UserForm</h1>
            <div>User name: ${this.model.get('name')} </div>
            <div>User age: ${this.model.get('age')} </div>
            <input />
            <button>Click Me!</button>
            <button class="set-age">Set Random age</button>
        </div>`
    }

    render():void{
        this.parent.innerHTML='' //clear before rendering
        const element =document.createElement("template");
        element.innerHTML=this.template()
        this.bindEvents(element.content)
        this.parent.append(element.content)
    }
 }