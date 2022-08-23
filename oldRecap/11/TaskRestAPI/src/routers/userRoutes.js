const mongoUsers = require('../db/UserDb')
const utilities = require('./utilities')
const express = require('express')
const router = new express.Router()

router.post('/users', async (req, res) =>{
    try{
        var erros = utilities.userCheckData(req.body)
        if ( erros.length >0 )
            return utilities.createBadRequest(res, erros)

        var newUser = await mongoUsers.addUser(new mongoUsers.dbUser(req.body.name, req.body.age, req.body.personalEmail, req.body.password))
        res.statusCode = 201
        return res.send(newUser)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.get('/users', async (req, res) =>{
    try{
        var users = await mongoUsers.getAllUsers()
        return res.send({ users })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.get('/users/:id', async (req, res) =>{
    try{        
        var user = await mongoUsers.readUserById(req.params.id)
        if (user)
            return res.send({ user })    
        return res.status(404).send({ id : req.params.id })        
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.patch('/users/:id', async (req, res) =>{
    try{
        var changes = {};
        if (req.body.name!== undefined)  
            changes.name = req.body.name
        if (req.body.age!== undefined)  
            changes.age = req.body.age
        if (req.body.personalEmail!== undefined)  
            changes.email = req.body.personalEmail
        if (req.body.password!== undefined)  
            changes.password = req.body.password
        if (utilities.isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})

        var result = await mongoUsers.updateUserById(req.params.id, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.delete('/users/:id', async (req, res) =>{
    try{        
        var remainingUser = await mongoUsers.deleteUserById(req.params.id)
        return res.send(remainingUser)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

function CreateError(e){
    return {
        errorMessage: e.message,
        stack  : e.stack           
    }
}

module.exports = router