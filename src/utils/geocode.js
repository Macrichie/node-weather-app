const request = require('postman-request');

// const url = 'http://api.weatherstack.com/current?access_key=5f4e03bdbde5be4c988071a9aa38f6f9&query=37.8267,-122.4233&units=f';

// request({ url: url, json: true }, (error, response) => {
//     //console.log(error);
//     if(error) {
//         console.log('Unable to connect to weather service', {'Error': error.message});
//     }else if(response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         console.log();
//     }
// });

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFjcmljaGllIiwiYSI6ImNrYmVmbndpdDBsaHUyeWw5Nzl0ZGs4b2IifQ.55VwnQD3lvZk-LtOhy-z9A&limit=1';

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to geolocation services', {'Error': error.message});
//     } else if(response.body.features.length === 0) {
//         console.log('Unable to find location coordinates');
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(latitude, longitude);
//     }
// });

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFjcmljaGllIiwiYSI6ImNrYmVmbndpdDBsaHUyeWw5Nzl0ZGs4b2IifQ.55VwnQD3lvZk-LtOhy-z9A&limit=1';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geolocation services', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location coordinates', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;