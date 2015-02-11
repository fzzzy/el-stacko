

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
  <Route path="/" handler={Test.test}>
    <Route name="another" handler={Another} />
    <DefaultRoute name="app" handler={Body.body} />
  </Route>
);


