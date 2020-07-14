const test = require('ava')
const ora = require('ora');
const { getLocationWeatherReport } = require('../src/utils')



test('WEATHERSTACK API should return location data', async (t) => {
    const result = await getLocationWeatherReport('New York')

    t.true(result.request.query === 'New York, United States of America')
    t.true(result.request.language === 'en')
    t.true(result.request.type === 'City')
    t.true(result.location.name === 'New York')
    t.true(result.location.region === 'New York')
    t.true(result.location.country === 'United States of America')
    t.true(result.location.timezone_id === 'America/New_York')
    t.true(typeof result.current.temperature === 'number')
    t.true(typeof result.current.observation_time === 'string')
    t.true(typeof result.current.wind_speed === 'number')
    t.true(typeof result.current.pressure === 'number')
})

test('WEATHERSTACK API should return an error for unknown location', async (t) => {
    const result = await getLocationWeatherReport('nolocation')
    t.true(result.success === false)
    t.true(result.error.type === 'request_failed')
    t.true(result.error.code === 615)
})