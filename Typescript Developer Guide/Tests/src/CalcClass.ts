/*
To set up a test project use the following steps:
1) Follow this guide https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421
    but create the test folder inside src --> src/test to avoid problem with tsconfig.json rootDir option
2) inside tsconfig.json add "types": ["jest", "node"], 
3) Create a 2° config tsconfig.prod.json this will use for the build the normal one for running the tests
    the difference is that inside  tsconfig.prod.json we from the build the tests folder "exclude": ["./src/test/**//*"],
   taken from https://stackoverflow.com/questions/54139158/cannot-find-name-describe-do-you-need-to-install-type-definitions-for-a-test 2° answer It's a bit tricky ...
4) change the build command to "build": "tsc --project tsconfig.prod.json" to use the new configuration and avoid bulding the test files
   */

export class CalcClass{
    constructor(private x: number, private y:number){}

    sum():number {
        return this.x + this.y
    }

    mul():number {
        return this.x * this.y
    }
}