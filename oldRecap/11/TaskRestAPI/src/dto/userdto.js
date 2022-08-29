var jwt = require('jsonwebtoken')

class userDto{
    constructor(name, age, email, password){
        this.name = name
        this.age = age
        this.email = email
        this.password = password
    }
    generateAuthToken(){
        return  jwt.sign({ name: this.name, email : this.email},
                         '1258Stars',  
                         { expiresIn : '500000 seconds'}) 
    }
}


module.exports = userDto