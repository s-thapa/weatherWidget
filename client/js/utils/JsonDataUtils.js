var request = require('superagent');
var AppServerActionCreators = require('../actions/AppServerActionCreators');

var weatherURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json';

module.exports ={
    getWeatherData() {
        request
            .get(weatherURL)
            .end((err, res) => {
                // FIXME: Create error
                var weatherData = res.body.query.results.channel.item;
                AppServerActionCreators.receivedWeatherData(weatherData);
            });
    }
};
