
let React = require("react"),
  body = require("./body.js");

let MainBody = body.MainBody;

exports.test = React.createClass({
  render: function () {
    return <html>
      <head>
        <title>
          Hello, World
        </title>
        <link rel="stylesheet" href="/css/styles.css"></link>
      </head>
      <body>
        <MainBody />
      </body>
    </html>;
  }
});


