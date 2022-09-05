
//to start => npm test

test('sum test', () => {
    const total = 5+6;
    if (total !== 11)
        throw new Error('Sum error')
})