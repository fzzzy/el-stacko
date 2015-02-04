
let hapi = require('hapi');

function* foo() {
  yield "Hello";
  yield "world";
}

// Create a server with a host and port
var server = new hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8080 
});

// Add the route
server.route({
  method: 'GET',
  path:'/', 
  handler: function (request, reply) {
    let output = "";
    for (var s of foo()) {
      output += s + " ";
    }
    reply(output);
  }
});

// Start the server
server.start();

console.log("server listening on http://localhost:8080/")


