 import { User, UserProp } from "../models/users"
 import { View } from "./View"

 export class UserForm extends View<User, UserProp>{

    protected eventsMap(): {[key: string] : () => void} {
        return {
            'click:.set-age': this.onSetAgeClick,    //event handler: click event on the button
            'click:.set-name' : this.onChangeNameClick,
            'mouseenter:h1' : this.onH1Hover,
            'click:.save-model' : this.onSaveClick,
        }
    }

    private onSaveClick = () : void =>{
        this.model.save()
    }

    protected template(): string{
        return `
        <div>
            <input placeholder="${this.model.get('name')}" />
            <button class="set-name">Change name!</button>
            <button class="set-age">Set Random age</button>
            <button class="save-model">Save User</button>
        </div>`
    }

    private onChangeNameClick = ():void=>{
         const e = this.parent.querySelector('input')
         if (e){ //checks if the element exists
            const name = e.value
            this.model.set({name}) //same as {'name': name}
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
 }