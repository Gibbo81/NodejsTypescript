console.log('running utils.js')

const user = {
    name : 'Plutus',
    age : 87,
    surname : 'primus',
    add : (a, b) => a + b,
    add2 : function(a, b){
        return a + b
    }
}

module.exports = user