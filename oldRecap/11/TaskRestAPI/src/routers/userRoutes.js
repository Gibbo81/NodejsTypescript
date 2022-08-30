const mongoUsers = require('../db/UserDb')
const utilities = require('./utilities')
const userDto = require('../dto/userdto')
const auth = require('../middleware/auth')
var bcrypt = require('bcryptjs')
const express = require('express')

const router = new express.Router()

router.post('/users', async (req, res) =>{
    try{
        var erros = userCheckData(req.body)
        if ( erros.length >0 )
            return utilities.createBadRequest(res, erros)

        var newUser = await mongoUsers.addUser(new userDto(req.body.name, 
            req.body.age, 
            req.body.personalEmail, 
            await bcrypt.hash(req.body.password, 8))) //saves password hash
        newUser.token = newUser.generateAuthToken()
        res.statusCode = 201
        return res.send(newUser)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.post('/users/login', async (req, res) =>{
    try{
        var erros = logInCheckData(req.body)
        if ( erros.length >0 )
            return utilities.createBadRequest(res, erros)
        var user = await mongoUsers.userByName(req.body.name) 
        if (!user || !await bcrypt.compare(req.body.password, user.password))
            return res.status(401).send()    
        return res.send( { token : user.generateAuthToken()})
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

//DEPRECATED after introducing autorization control --> use instead /users/me
router.get('/users/:id/dep', async (req, res) =>{
    try{   
        return res.status(410).send({suggestion : 'use .../users/me instead'})       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

//from here authentication is reqired to call the routes
//auth is the middalware
router.get('/users', auth, async (req, res) =>{
    try{
        var users = await mongoUsers.getAllUsers()
        return res.send({ users })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

//get the user data from the token
router.get('/users/me', auth, async (req, res) =>{
    try{
        var users = await mongoUsers.userByName(req.userName)
        return res.send( users )
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.patch('/users', auth, async (req, res) =>{
    try{
        var changes = {};
        if (req.body.age!== undefined)  
            changes.age = req.body.age
        if (req.body.personalEmail!== undefined)  
            changes.email = req.body.personalEmail
        if (req.body.password!== undefined)  
            changes.password = await bcrypt.hash(req.body.password, 8)
        if (utilities.isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})

        var result = await mongoUsers.updateUserByName(req.userName, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.delete('/users', auth, async (req, res) =>{
    try{        
        var remainingUser = await mongoUsers.deleteUserByName(req.userName)
        return res.send(remainingUser)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

function userCheckData(request){
    result =logInCheckData(request)    
    if ( request.personalEmail  === undefined )
        result.push('missing email')
    return result;
}

function logInCheckData(request){
    result =[]
    if ( request.name === undefined  )
        result.push('missing name')
    if ( request.password === undefined  )
        result.push('missing password')
    return result;
}

module.exports = router