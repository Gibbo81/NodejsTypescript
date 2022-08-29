var jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const tokenData = jwt.verify(token, '1258Stars')
        console.log(tokenData)
        req.userName = tokenData.name //to give to the route all the necessary data
        req.email = tokenData.email
        next();            
    }
    catch (e){
        res.status(401).send('Authentication error')   
    }
}

module.exports = auth