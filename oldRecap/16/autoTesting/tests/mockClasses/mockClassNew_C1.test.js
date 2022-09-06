const classToTest = require('../../usingC1Class')
const classToMock = require('../../C1Class')
jest.mock('../../C1Class')

test('fine with 10 and 43', async () => {
     classToMock.mockImplementation(() => {
         return {
             f1: () =>  53,
             f2: () =>  -33,
             f3Async: () =>  Promise.resolve(430),
         }
       })

    var result = await classToTest(10,43)

    expect(result.f1).toBe(53)
    expect(result.f2).toBe(-33)
    expect(result.f3).toBe(430)
})
