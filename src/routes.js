

let React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  Test = require("./test.js"),
  Body = require("./body.js")
  
var Another = React.createClass({
  render: function() {
    return <h1>what up</h1>;
  }
});

exports.routes = (
  <Route name="app" path="/" handler={Test.test}>
    <Route name="another" handler={Another} />
    <DefaultRoute handler={Body.body} />
  </Route>
);


