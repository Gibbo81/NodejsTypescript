const mongoUsers = require('./db/UserDb')
const express = require('express')
const app = express()
app.use(express.json())


app.post('/users', async (req, res) =>{
    try{
        var erros = userCheckData(req.body)
        if ( erros.length >0 ){
            return res.status(400).send({
                missingFields : erros
            })    
        }

        var newUser = await mongoUsers.addUser({
            name: req.body.name,
            age : req.body.age, 
            email: req.body.personalEmail,
            password: req.body.password
        })
        res.statusCode = 201
        return res.send(newUser)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({
            reason : e,
            message: e.message ,
            stack  : e.stack           
        })  
    }     
})

function userCheckData(request){
    result =[]
    if ( !request.name ){
        result.push('missing name')
    }
    if ( !request.password ){
        result.push('missing password')
    }
    if ( !request.personalEmail){
        result.push('missing email')
    }
    return result;
}

//start listening on port 3010
app.listen(3010, () =>{
    console.log('server started')
})