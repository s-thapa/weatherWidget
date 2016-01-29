var React = window.React = require('react');
var JsonDataUtils = require('./utils/JsonDataUtils');
var RouteHandler = require('react-router').RouteHandler;

JsonDataUtils.getWeatherData();
var Main = React.createClass({
    render: function() {
        return(
            <div>
                <RouteHandler />
            </div>
        )
    }
});
module.exports = Main;
