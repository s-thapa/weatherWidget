var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var JsonDataUtils = require('../utils/JsonDataUtils');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _weatherData ={};

function setWeatherData(data) {
    _weatherData = data;
}

var WeatherStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getWeatherData() {
        return _weatherData;
    }
});

WeatherStore.dispatchToken = AppDispatcher.register((payload) => {
    var action = payload.action;
    switch(action.type) {
        case AppConstants.ActionTypes.RECEIVED_WEATHER_DATA:
            setWeatherData(action.weatherData);
            WeatherStore.emitChange();
            break;
        default:
        // po op
    }
});

module.exports = WeatherStore;
