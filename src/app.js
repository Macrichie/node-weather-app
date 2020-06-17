// Dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { registerHelper } = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Olakunle Makanjuola'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Olakunle Makanjuola'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help',
        author: 'Olakunle Makanjuola'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is required as query string'
        });
    }
   
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Olakunle Makanjuola',
        errorMessage: 'Oops 🤕! Help article not found'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Olakunle Makanjuola',
        errorMessage: 'Oops 🤕! Page Not Found, did you miss your way?'    
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});