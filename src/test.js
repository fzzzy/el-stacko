
let hapi = require("hapi"),
  react = require("react");

function* foo() {
  yield "Hello";
  yield "world";
  yield "<a href=/react>test react</a>";
}

// Create a server with a host and port
var server = new hapi.Server();
server.connection({
  host: "localhost",
  port: 8080
});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: function (request, reply) {
    let output = "";
    for (var s of foo()) {
      output += s + " ";
    }
    reply("<!DOCTYPE html><html><head><title>Hello</title><link href=/styles.css rel=stylesheet></head><body>" + output + "</body></html>");
  }
});

server.route({
  method: "GET",
  path: "/react",
  handler: function (request, reply) {
    let r = require("./testreact.jsx");
    reply(react.renderToString(r.foo()));
  }
});

server.route({
  method: "GET",
  path: "/styles.css",
  handler: function (request, reply) {
    console.log("styles");
    reply.file("dist/styles.css");
  }
});

// Start the server
server.start();

console.log("server listening on http://localhost:8080/")


