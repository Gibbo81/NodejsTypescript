const c1 = require('./C1Class') 

const all = async (x, y) => {
    const o = new c1(x,y)
    return {
        f1 : o.f1(),
        f2 : o.f2(),
        f3 : await o.f3Async()
    }
}

module.exports = all