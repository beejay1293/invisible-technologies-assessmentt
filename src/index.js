const { table } = require('table')
const ora = require('ora');

const { getLocationWeatherReport, generateTableFromData } = require('./utils')
const spinner = ora('Loading weather report')

const [executor, ignoredBin, script, ...args] = process.argv
const input = args[0].split(", ")

const getWeatherReport = async (locations) => {
 try {
  spinner.start()
  spinner.color = 'yellow';

  let weatherData = []

  for (let i = 0; i < locations.length;) {
    //if string and next item is number
    if (locations[i] && parseInt(locations[i + 1])) {
      const locationName = locations[i]
      const postalCode = locations[i + 1]

      const res = await getLocationWeatherReport(locationName).then(res => res.json())
      const { location, current } = res
      
      const locationWeather = current ? current.weather_descriptions[0] : 'not found'
      const locationTemp = current ? `${current.temperature} degrees` : 'not found'
      const localTime = location ? location.localtime : 'not found'

      weatherData.push([locationName, locationWeather, locationTemp, localTime])
      i += 2
    } else {
      const locationName = locations[i]

      const res = await getLocationWeatherReport(locationName).then(res => res.json())
      const { location, current } = res
      
      const locationWeather = current ? current.weather_descriptions[0] : 'not found'
      const locationTemp = current ? `${current.temperature} degrees` : 'not found'
      const localTime = location ? location.localtime : 'not found'

      weatherData.push([locationName, locationWeather, locationTemp, localTime])
      i += 1
    }
  }
  
  spinner.stop()
  console.log(generateTableFromData(weatherData))
 } catch (error) {
   spinner.stop()
   console.log(error.message)
 }
}

getWeatherReport(input)
