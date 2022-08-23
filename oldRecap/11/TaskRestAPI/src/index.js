const routesUser = require('./routers/userRoutes')
const routestask = require('./routers/taskRoutes')
const express = require('express')
const app = express()

app.use(express.json())
app.use(routesUser)
app.use(routestask)

//start listening on port 3010
app.listen(3010, () =>{
    console.log('server started')
})