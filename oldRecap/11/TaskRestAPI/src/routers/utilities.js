function createBadRequest(res, erros){
    return res.status(400).send({ missingFields : erros})
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function CreateError(e){
    return {
        errorMessage: e.message,
        stack  : e.stack           
    }
}

module.exports = {
    createBadRequest,
    isEmpty,
    CreateError    
}