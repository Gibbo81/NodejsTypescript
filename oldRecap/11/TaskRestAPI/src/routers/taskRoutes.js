const mongoTasks = require('../db/TaskDb')
const utilities = require('./utilities')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) =>{
    try{
        var erros = taskCheckData(req.body)
        if ( erros.length >0 )
            return utilities.createBadRequest(res, erros)
        
        const crerationDate = new Date()
        var newTask = await mongoTasks.addtask(new mongoTasks.dbTask(req.body.description, 
                                                                     req.body.completed,
                                                                     req.userName,
                                                                     crerationDate,
                                                                     crerationDate))
        res.statusCode = 201
        return res.send(newTask)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.get('/tasks', auth, async (req, res) =>{
    try{
        var errrors = paginationCheckData(req)
        if ( errrors.length >0 )
            return utilities.createBadRequest(res, errrors)
        var tasks = await mongoTasks.readAllTasks(req.userName, 
                                                  req.query.completed,
                                                  undefinedDefaultValue(req.query.page, 1),
                                                  undefinedDefaultValue(req.query.pagewidth, 3),
                                                  undefinedDefaultValue(req.query.sortBy, 'createDate') )
        return res.send({ tasks })
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.get('/tasks/:id', auth, async (req, res) =>{
    try{        
        var task = await mongoTasks.ReadTaskById(req.params.id, req.userName)
        if (task)
            return res.send({ task })    
        return res.status(404).send({ id : req.params.id })        
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.delete('/tasks/:id', auth, async (req, res) =>{
    try{        
        var remainingTasks = await mongoTasks.deleteTaskById(req.params.id, req.userName)        
        return res.send(remainingTasks)            
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

router.patch('/tasks/:id', auth, async (req, res) =>{
    try{
        var changes = {};
        if (req.body.description !== undefined)  
            changes.description = req.body.description
        if (req.body.completed !== undefined)  
            changes.completed = req.body.completed
        if (utilities.isEmpty(changes))
            return res.status(400).send({ Error : "No changes present"})
        changes.updateDate = new Date()
        var result = await mongoTasks.updateTaskById(req.params.id, req.userName, changes)
        if (result.matchedCount === 0)
            return res.status(404).send()
        return res.send(result)       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(utilities.CreateError(e))  
    }     
})

function undefinedDefaultValue(ob, defaultValue){
    return (ob === undefined) ? defaultValue : ob
}

function taskCheckData(request){
    result =[]
    if ( request.description === undefined )
        result.push('missing description')
    return result;
}

function paginationCheckData(request){
    result =[]
    if ( (request.query.pagewidth !== undefined) && isNaN(request.query.pagewidth) )
        result.push('pagewidth is not a number: '+ request.query.pagewidth)
    if ( (request.query.page !== undefined) && isNaN(request.query.page) )
        result.push('page is not a number: ' + request.query.page)
    return result;
}

module.exports = router