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

////////////////////////////////////////////////////////////////////////////////
var jwt = require('jsonwebtoken')

const jsonWebToken = async () => {
    const secret = "assunzionidiriferimentodiunadulto"
    const token = jwt.sign({ //object containing all the data we need to embed inside the token
        _id : '62fe00cf47c684b49e1186d4',
        name: 'Long BBBB'
    },       // for the moment only the user _id and name
    secret,  //secret: any serious of characters will work
    { expiresIn : '500000 seconds'})     //optional token duration
    try{
        console.log ("valid:",  jwt.verify(token, secret))          //good
        console.log ("valid:",  jwt.verify(token, 'wrong secret'))  //bad -> exception
    }
    catch (e){
        console.log('invalid:', e.message)
    }

}

jsonWebToken()