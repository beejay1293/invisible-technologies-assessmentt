const fetch = require('node-fetch')
const { table } = require('table')
require('dotenv').config()


const getLocationWeatherReport = async (location) => {
    return fetch(`http://api.weatherstack.com/current?access_key=${process.env.access_key}&query=${location}`, 
    {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' }   
    }).then(res => res.json())
}

const generateTableFromData = (data) => {
   let tableData = [['Location', 'weather', 'temperature', 'Date']]

   data.forEach(element => {
       tableData.push(element)
   });

   return table(tableData)
}

module.exports = {
   getLocationWeatherReport,
   generateTableFromData
}

