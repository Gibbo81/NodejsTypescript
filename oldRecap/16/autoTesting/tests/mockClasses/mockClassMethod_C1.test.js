const classToTest = require('../../usingC1')
const methodToMock = require('../../C1')

test('fine with 10 and 43', async () => {
    methodToMock.f1 = basicMockCreator(53)
    methodToMock.f2 = basicMockCreator(-33)
    methodToMock.f3 = basicMockCreator(Promise.resolve(430))

    var result = await classToTest(10,43)

    expect(result.f1).toBe(53)
    expect(result.f2).toBe(-33)
    expect(result.f3).toBe(430)
})

function basicMockCreator(returnValue){
    const mock = jest.fn()        
    mock.mockReturnValue(returnValue)
    return mock
}