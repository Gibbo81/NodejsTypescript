var bcrypt = require('bcryptjs')

//this is a variable and must be assigned before the use
const myfunc = async () => {
    const pass = 'noMore!'
    const hashedPassword = await bcrypt.hash(pass, 8)
    console.log('is match:', await bcrypt.compare(pass, hashedPassword))
    return { pass, hashedPassword}
}

myfunc().then(async result => {
            console.log(result)
            await myfunc2()
        })
        .catch(e => console.log(e))
        .finally (()=> console.log('!!!!DONE!!!!'))

async function myfunc2() {
    const pass = 'noMore!'
    const hashedPassword = await bcrypt.hash(pass, 8)
    console.log( { pass, hashedPassword} )
}
