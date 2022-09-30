interface printable {
    name: string,
    location: {
        lat: string,
        lng: string
    },
    stringing() : string
}

//dependency inversion principle
//to use this method you must have an object that respect this interface
export function printMe(o : printable): void{
    console.log(`${o.name} is in location lat:${o.location.lat}  lng:${o.location.lng} custom: ${o.stringing()}`)
}


