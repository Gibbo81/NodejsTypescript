//https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421

export class CalcClass{
    constructor(private x: number, private y:number){}

    sum():number {
        return this.x + this.y
    }

    mul():number {
        return this.x * this.y
    }
}