const test = require('ava')
const { generateTableFromData } = require('../src/utils')
const { table } = require('table')

test('getTableFromData should output correct table info from weather data', (t) => {
    const data = [
        [ 'New York', 'Sunny', '24 degrees', '2020-07-12 07:05' ]
    ]

    const table = generateTableFromData(data)

    const containsLocationHeader1 = table.includes('Location')
    const containsLocationHeader2 = table.includes('weather')
    const containsLocationHeader3 = table.includes('temperature')
    const containsLocationHeader4 = table.includes('Date')
    const containsLocationData1 = table.includes('New York')
    const containsLocationData2 = table.includes('Sunny')
    const containsLocationData3 = table.includes('24 degrees')
    const containsLocationData4 = table.includes('2020-07-12 07:05')

    t.true(containsLocationHeader1)
    t.true(containsLocationHeader2)
    t.true(containsLocationHeader3)
    t.true(containsLocationHeader4)
    t.true(containsLocationData1)
    t.true(containsLocationData2)
    t.true(containsLocationData3)
    t.true(containsLocationData4)
})
