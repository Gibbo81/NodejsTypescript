//to start => npm test
//https://jestjs.io/docs/expect

const {tip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../math')

test('sum test', () => {
    const total = 5+6;
    if (total !== 11)
        throw new Error('Sum error')
})

test('default tip is 20%', ()=> {
    const bill= 100
    
    var result = tip(bill)

    expect(result).toBe(120) //https://jestjs.io/docs/expect
})

test('25% tip works fine', ()=> {
    const bill= 100
    const tipPercent = 0.25
    
    var result = tip(bill, tipPercent)

    expect(result).toBe(125) 
})

test('should convert 32 F to 0 C', ()=> {
    const temperatureF= 32 
        
    var result = fahrenheitToCelsius(temperatureF)

    expect(result).toBe(0) 
})

test('should convert 0 C to 32 F', ()=> {
    const temperatureC= 0 
        
    var result = celsiusToFahrenheit(temperatureC)

    expect(result).toBe(32) 
})

test('async sum must work', async () => {
    const x = 10 
    const y = 65
        
    var result = await add(x, y)

    expect(result).toBe(75) 
})