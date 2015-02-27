

let request = require("superagent"),
  React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  shell = require("./views/shell.js"),
  another = require("./views/another.js"),
  body = require("./views/body.js"),
  post = require("./views/post.js"),
  tag = require("./views/tag.js"),
  url = require("url");


exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <Route name="another" handler={another.Another} />
    <Route name="post" path="post/:postId" handler={post.Post} />
    <Route name="tag" path="/tag" handler={tag.Tag} />
    <DefaultRoute name="app" handler={body.Body} />
  </Route>
);

try {
  window.React = React;
  window.shell = shell;
  window.Router = Router;
  window.routes = exports;
  window.request = request;
  window.url = url;
} catch (e) {
  
}


