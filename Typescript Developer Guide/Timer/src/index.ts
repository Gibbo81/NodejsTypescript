
function createPromise(x: number) : Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        setTimeout(()=> {
            resolve(x)
        }, 2000)})
}

var x = setInterval(mytimer, 4000)
var x2 = setInterval(mytimer2, 5000)
var x3 = setInterval(mytimerasync, 5000)

var count = 1
function mytimer(): void{
    console.log(`try ${count} date: ${new Date()}` )
    count  +=1
}

var count2 = { count :1}
function mytimer2(): void{
    console.log(`BIS BIS BIS: ${count2.count}` )
    count2  = { count : (count2.count+1)}  // try out recreating the object
}

var count3 = 1
async function mytimerasync(): Promise<void>{
    var promise = createPromise(count3 + 100)
    var result = await promise
    console.log(`promise: ${count3}, value: ${result} ` )
    count3 += 1
}  // try out recreating the object






