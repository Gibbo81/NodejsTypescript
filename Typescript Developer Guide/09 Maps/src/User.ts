//by convention if we have a .ts file to create and export a class we start it with capitol letter

import faker from 'faker'
//npm install @types/faker //to import the type wrapper for this packages


export class User {
    name: string
    location: {
        lat: string,
        lng: string
    };

    constructor (){
        this.name= faker.name.firstName()
        this.location={
            lat : faker.address.latitude(),
            lng : faker.address.longitude(),
        }
    }
}