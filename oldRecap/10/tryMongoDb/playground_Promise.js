const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=> {
        resolve([10,56,'pippus'])
    }, 2000)
})

const doWorkPromiseError = new Promise((resolve, reject)=>{
    setTimeout(()=> {
        reject('BROKEN')
    }, 1000)
})

doWorkPromise.then((result) => console.log(result) )
             .catch((error) => console.log('Error: ', error))
doWorkPromiseError.then((result) => console.log(result) )
                  .catch((error) => console.log('Error 2: ', error))

console.log("main end")
