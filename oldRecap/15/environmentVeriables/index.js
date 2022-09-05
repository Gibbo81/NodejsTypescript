

//to start this test use command: npm run dev (env-cmd -f ./config/dev.env node index.js)
//2° testcommand: npm run prod 
console.log(process.env)
console.log(process.env.port)
console.log(process.env.mongoConnection)
console.log(process.env.preferredcolor)


//package env-cmd is used to load environment variable, injecting the file dev.env at run time is possible to have different configurations 
//Or you can use different command to start the application