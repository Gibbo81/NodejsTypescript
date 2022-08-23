function createBadRequest(res, erros){
    return res.status(400).send({ missingFields : erros})
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function taskCheckData(request){
    result =[]
    if ( request.description === undefined )
        result.push('missing description')
    return result;
}


module.exports = {
    createBadRequest,
    isEmpty,
    taskCheckData
}