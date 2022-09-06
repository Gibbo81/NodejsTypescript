const {f1, f2, f3Async} = require('./C1') 

const all = async (x, y) => {
    return {
        f1 : f1(x,y),
        f2 : f2(x,y),
        f3 : await f3Async(x,y)
    }
}

module.exports = all