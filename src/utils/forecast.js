const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f4e03bdbde5be4c988071a9aa38f6f9&query=' + latitude + ',' + longitude + '&units=f';
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find location services', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degrees fahreinheit out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%, there is a ${body.current.precip}% chance of rain.`);
        }
    })
};


module.exports = forecast;