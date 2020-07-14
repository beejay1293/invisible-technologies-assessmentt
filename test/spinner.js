const test = require('ava')
const ora = require('ora');


test('spinner', (t) => {
    const spinner = ora('Loading weather report')
    t.true(spinner.text === 'Loading weather report')
})