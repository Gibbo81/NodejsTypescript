
//ctrl+click on express to open the espress types definition file with all the types it exports
import express, {Request, Response} from 'express' //o import both the full object and some of its submodules
//not strictly necessry i can use express.Request but it's easier
import { router } from './routes/loginRoutes'




const app =express()
app.use(router)

app.listen(3000, ()=>{console.log('listening on port 3000')})