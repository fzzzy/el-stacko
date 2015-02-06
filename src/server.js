
let hapi = require("hapi"),
  React = require("react"),
  test = require("./test.js");

// Create a server with a host and port
var server = new hapi.Server();
server.connection({host: "localhost", port: 8080});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    reply(React.renderToString(React.createElement(test.test)));
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

// Start the server
server.start();
console.log("server listening on http://localhost:8080/")


