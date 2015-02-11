

let hapi = require("hapi"),
  React = require("react"),
  test = require("./test.js");

let footer = "</body></html>",
  footer_length = footer.length;

// Create a server with a host and port
let server = new hapi.Server();
server.connection({host: "localhost", port: 8080});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    let output = React.renderToString(React.createElement(test.test)),
        end_index = output.length - footer_length;

    let header = output.slice(0, end_index),
        footer = output.slice(end_index),
        script = "<script>React.render(React.createElement(test, {greeting: 'Hello, World'}), document);</script>";

    reply(header + script + footer);
  }
});

server.route({
  method: "GET",
  path: "/css/{param*}",
  handler: {
    directory: {
      path: "dist/css"
    }
  }
});

server.route({
  method: "GET",
  path: "/js/bundle.js",
  handler: {
    file: {
      path: "dist/js/bundle.js"
    }
  }
});

// Start the server
server.start();
console.log("server listening on http://localhost:8080/")


