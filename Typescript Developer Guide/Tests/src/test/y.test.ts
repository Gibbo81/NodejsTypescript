import {CalcClass} from'../CalcClass'

test('calcclass mul is correct', ()=>{
    var c = new CalcClass(10,20)

    var result = c.mul()

    expect(result).toBe(200)
})

test('calcclass sum is correct', ()=>{
    var c = new CalcClass(10,20)

    var result = c.sum()

    expect(result).toBe(30)
})