

let request = require("superagent"),
  React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  shell = require("./views/shell.js"),
  main = require("./views/main.js"),
  url = require("url");


exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <DefaultRoute name="main" handler={main.Main} />
  </Route>
);

try {
  window.React = React;
  window.Router = Router;
  window.shell = shell;
  window.routes = exports;
  window.request = request;
  window.url = url;
} catch (e) {
  
}


