//https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
//Just go to tsconfig.json and set
// "compilerOptions": {
//     "strictPropertyInitialization": false,
// Otherwise you need to initialize all your variables which is a little bit annoying

export class Holder<T>{
    public data :T
}


var n = new Holder<number>()
n.data=99

var s = new Holder<string>()
s.data='126 starts'
