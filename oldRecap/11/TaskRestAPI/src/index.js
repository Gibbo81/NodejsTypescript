const routesUser = require('./routers/userRoutes')
const routestask = require('./routers/taskRoutes')
const express = require('express')
const app = express()

//this run before each controller, only a simple logger before the operation goes on
app.use((req, res, next) =>{
    console.log(req.method, req.path)
    next()
})


app.use(express.json())
app.use(routesUser)
app.use(routestask)

//start listening on port 3010
app.listen(3010, () =>{ 
    console.log('server started')
})