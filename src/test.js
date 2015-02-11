

let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link,
  RouteHandler = Router.RouteHandler;

exports.test = React.createClass({
  render: function () {
    return <html>
      <head>
        <title>
          Hello, World
        </title>
        <script src="/js/bundle.js"></script>
        <link rel="stylesheet" href="/css/styles.css"></link>
      </head>
      <body>
        <Link to="app">Home</Link>
        <Link to="another">Another</Link>
        <RouteHandler greeting="Hello" />
      </body>
    </html>;
  }
});

try {
  window.React = React;
  window.test = exports.test;
} catch (e) {
  
}


