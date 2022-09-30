import faker from 'faker'
import {printable} from './printable'

// implements printable is not necessary because the check is implicit when we use the object
//but we can explicit the check to help typescript to report the error as soon as possible
export class Company implements printable{
     name:string
     catchPhrase:string
     location: {
        lat: string,
        lng: string
    }

    constructor(){
        this.name= faker.company.companyName()
        this.catchPhrase = faker.company.catchPhrase()
        this.location={
            lat : faker.address.latitude(),
            lng : faker.address.longitude()
        }
    }

    stringing() {
        return this.catchPhrase
    }
}

