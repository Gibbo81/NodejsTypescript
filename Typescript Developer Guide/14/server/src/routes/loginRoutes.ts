import {Router, Request, Response, NextFunction} from 'express'


function requiredAuth(req:Request, res:Response, next : NextFunction) : void {
    if (req.session && req.session.loggedIn)
        return next() //procede to next handler
    else{
        res.status(403)
        res.send('forbidden')
    }
}

const router = Router()

router.get('/login', (req:Request, res:Response)=> {    
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>`)
})

router.get('/logout', (req:Request, res:Response)=> {    
    if (req.session)
        req.session.loggedIn=false
    res.redirect('/')
})

router.post('/login', (req:Request, res:Response)=> {    
    //by default req doesn't have a body property, it's only because we added a parser: 'app.use(bodyParser.urlencoded({ extended:true}))'
    //that we are able to use the body
    const {email,password} = req.body
    if(email && password && email==='pi@pi.com' && password === 'pluto'){
        //as before req does not have a session property by default, we enable it adding: 'app.use(cookieSession({keys:['oooo']}))'  inside index.ts
        if (req.session)
            req.session.loggedIn=true
        else
            req.session = { loggedIn : true}
        res.redirect('/')
    }else {
        res.send('invalid credential')
    }

})

router.get('/', (req:Request, res:Response)=> {    
    if(req.session && req.session.loggedIn)    
        res.send(`
            <div>       
                <div>you are logged in!!</div>                
                <a href="/logout">logout</a>
            </div>`)
    else
    res.send(`
    <div>                    
        <div>you are NOT logged in!</div>
        <a href="/login">login</a>
    </div>`)
})

router.get('/protected', requiredAuth, (req:Request, res:Response)=> {    
    res.send(`welcom to protected route`)
})

export {router}