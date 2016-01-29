var React = require('react');
var Main = require('../main.js');
var App = require('./App.react.jsx');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

module.exports = (
        <Route name="main" path="/" handler={Main} >
            <DefaultRoute handler={App} />
            <NotFoundRoute handler={App} />
        </Route>
);
