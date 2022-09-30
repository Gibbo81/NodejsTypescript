import faker from 'faker'


export class Company{
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

