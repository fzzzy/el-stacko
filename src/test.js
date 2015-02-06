
let React = require("react"),
  body = require("./body.js");

let MainBody = body.MainBody;

let greeting = "Hello, World";

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
        <MainBody greeting={greeting} />
      </body>
    </html>;
  }
});

try {
  window.React = React;
  window.MainBody = MainBody;
} catch (e) {
  
}


