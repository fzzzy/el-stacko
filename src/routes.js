

let React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  shell = require("./shell.js"),
  another = require("./another.js"),
  body = require("./body.js");

exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <Route name="another" handler={another.Another} />
    <DefaultRoute name="app" handler={body.Body} />
  </Route>
);


