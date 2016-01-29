var React = require('react');
import _ from "lodash";

function getFiveDay(value, key) {

    return (<div className="day-info">
        <h4 className="day">{value.day}</h4>
        <h5>{value.high}&deg; / {value.low}&deg;</h5>
    </div>);
}

var WeatherWidget = React.createClass({

    render() {
        var weatherData = this.props.weatherData;
        var fiveDayData = weatherData.forecast;
        var fiveDayForecast = _.map(fiveDayData, getFiveDay);
        if(weatherData && weatherData.title && weatherData.condition && weatherData.condition.temp && weatherData.condition.text) {
            var description = weatherData.description;
            var weatherIconUrl = description.split("\"/><br />\n");
            var weatherIcon = weatherIconUrl[0].slice(11);
            var location = weatherData.title.split("at");
            location = location[0].slice(15);
            var widgetData = <div className="weather-wrapper">
                <h3 className="location">{location}</h3>
                <div className="current-weather">
                    <h1 className="temp">{weatherData.condition.temp}&deg;</h1>
                    <h3 className="weather-icon"><img src={weatherIcon} /></h3>
                    <span className="weather-text">{this.props.weatherData.condition.text}</span>
                </div>
                <div className="five-day"> {fiveDayForecast}</div>
            </div>
        }

        return (
            <div className="weather-widget">
                {widgetData}
            </div>
        )
    }
});

module.exports = WeatherWidget;