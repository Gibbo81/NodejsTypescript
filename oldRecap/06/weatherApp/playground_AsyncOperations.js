console.log('start')

//setInterval

setTimeout(()=>{
    console.log('first timeout: 2 second passed')
}, 2000)

setTimeout(()=>{
    console.log('second timeout: 0 second passed')
}, 0) // 0 ,millisecond execute immidiatly  but still must wait for end log


console.log('end')


function sum(x, y, callBack){
    var result = x+y;
    setTimeout(()=>{
        callBack(result)
    }, 5000)
}

sum(10,55, (value)=> console.log('the value is: '+ value))
