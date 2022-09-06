function f1(x,y){
    return x+y
}

function f2(x,y){
    return x-y
}

function f3Async(x,y){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x * y), 500)
    })
}

module.exports={ f1, f2, f3Async}