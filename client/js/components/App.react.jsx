var React = require('react');

var AppConstants = require('../constants/AppConstants');
var WeatherStore = require('../stores/WeatherStore');
var WeatherWidget = require('./WeatherWidget.react.jsx');
import { Navigation } from 'react-router';

function getStateFromStores() {
    return {
        weatherData: WeatherStore.getWeatherData(),
    };
}

var App = React.createClass({
    mixins: [ Navigation ],

    getInitialState() {
        return getStateFromStores();
    },

    _onChange() {
        this.setState(getStateFromStores());
    },

    componentDidMount() {
        WeatherStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        WeatherStore.removeChangeListener(this._onChange);
    },

    render() {
        return (
            <div className='app-wrapper'>
                <WeatherWidget weatherData= {this.state.weatherData}/>
            </div>
        );
    }
});
module.exports = App;
