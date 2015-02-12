

let React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  shell = require("./views/shell.js"),
  another = require("./views/another.js"),
  body = require("./views/body.js");

exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <Route name="another" handler={another.Another} />
    <DefaultRoute name="app" handler={body.Body} />
  </Route>
);



try {
  window.React = React;
  window.shell = shell;
  window.Router = Router;
  window.routes = exports;
} catch (e) {
  
}


