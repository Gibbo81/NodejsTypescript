const mongoTasks = require('../db/TaskDb')
const utilities = require('./utilities')
const express = require('express')
const router = new express.Router()

router.post('/tasks', async (req, res) =>{
    try{
        var erros = utilities.taskCheckData(req.body)
        if ( erros.length >0 )
            return utilities.createBadRequest(res, erros)

        var newTask = await mongoTasks.addtask(new mongoTasks.dbTask(req.body.description, req.body.completed))
        res.statusCode = 201
        return res.send(newTask)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.get('/tasks', async (req, res) =>{
    try{
        var tasks = await mongoTasks.readAllTasks()
        return res.send({ tasks })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.get('/tasks/:id', async (req, res) =>{
    try{        
        var task = await mongoTasks.ReadTaskById(req.params.id)
        if (task)
            return res.send({ task })    
        return res.status(404).send({ id : req.params.id })        
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.delete('/tasks/:id', async (req, res) =>{
    try{        
        var remainingTasks = await mongoTasks.deleteTaskById(req.params.id)        
        return res.send(remainingTasks)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(CreateError(e))  
    }     
})

router.patch('/tasks/:id', async (req, res) =>{
    try{
        var changes = {};
        if (req.body.description !== undefined)  
            changes.description = req.body.description
        if (req.body.completed !== undefined)  
            changes.completed = req.body.completed
        if (utilities.isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})

        var result = await mongoTasks.updateTaskById(req.params.id, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
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