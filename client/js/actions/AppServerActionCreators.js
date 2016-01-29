var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


module.exports = {
    receivedWeatherData(weatherData) {
        AppDispatcher.handleServerAction({
            type: AppConstants.ActionTypes.RECEIVED_WEATHER_DATA,
            weatherData: weatherData
        });
    }
};
