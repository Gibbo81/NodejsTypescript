import { View } from "./View"
import { User, UserProp } from "../models/users"
import { UserForm } from "./UserForm"
import { UserShow } from "./UserShow"

export class UserEdit extends View<User, UserProp> {
    
    protected template(): string {
        return `
        <div>
            <div class="user-show"> </div>
            <div class="user-form"> </div>            
        </div>
        `
    }

    protected onRender(): void {
        const x = new UserShow(this.regions.userShow, this.model)
        x.render()
        const y = new UserForm(this.regions.userForm, this.model)
        y.render()
    }

    protected regiosnMap(): { [key: string]: string } {
        return {
            userShow: ".user-show",
            userForm: ".user-form"
        }
    }
}