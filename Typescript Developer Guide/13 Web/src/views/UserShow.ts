import { View } from "./View"
import { User, UserProp } from "../models/users"

export class UserShow extends View<User, UserProp> {
    
    protected template(): string {
        return `
        <div>
            <h1>User Details</h1>
            <div>User name: ${this.model.get('name')}</div>
            <div>User age: ${this.model.get('age')}</div>
        </div>`
    }
}
