

let request = require("superagent"),
  React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  shell = require("./views/shell.js"),
  another = require("./views/another.js"),
  body = require("./views/body.js"),
  post = require("./views/post.js");

exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <Route name="another" handler={another.Another} />
    <Route name="post" path="posts/:postId" handler={post.Post} />
    <DefaultRoute name="app" handler={body.Body} />
  </Route>
);

try {
  window.React = React;
  window.shell = shell;
  window.Router = Router;
  window.routes = exports;
  window.request = request;
} catch (e) {
  
}


