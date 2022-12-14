import { ConfigurationReader } from "./service/ConfigurationReader";


//Fast debug: ts-node ./src/index.ts from javascript debug terminal

console.log('Hello!!!!!')

//var reader = new ConfigurationReader('C:/Repo/NodejsTypescript/RP/configurations/')
var reader = new ConfigurationReader('./configurations/')
reader.load().then(x =>console.log(x))

