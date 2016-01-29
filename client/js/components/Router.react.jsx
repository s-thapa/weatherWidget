var React = require('react');
var Router = require('react-router');
var Routes = require('./Routes.react.jsx');

Router.run(Routes, function(Root, state){
    React.render(<Root />, document.getElementById('app'));
});

