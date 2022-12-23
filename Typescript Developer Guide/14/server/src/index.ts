
//Use express with typescript with the less possible changes. 

//ctrl+click on express to open the espress types definition file with all the types it exports
import express, {Request, Response} from 'express' //o import both the full object and some of its submodules
//not strictly necessry i can use express.Request but it's easier
import { router } from './routes/loginRoutes'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


const app =express()
app.use(bodyParser.urlencoded({ extended:true})) //in the other course we used app.use(express.json())
app.use(cookieSession({keys:['oooo']}))
app.use(router)

app.listen(3000, ()=>{console.log('listening on port 3000')})