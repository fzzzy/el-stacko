

let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js");

let server = http.createServer(function (req, res) {
  let pth = url.parse(req.url).pathname;

  if (pth.indexOf("/js/") === 0 || pth.indexOf("/css/") === 0) {
    let filename = path.join(__dirname, pth);
    fs.exists(filename, function(exists) {
      if (exists) {
        fs.createReadStream(filename).pipe(res);
      } else {
        res.writeHead(404); res.end("Not Found");
      }
    });
    return;
  }

  Router.run(routes.routes, req.url, function (Handler, state) {
    let response = React.renderToString(<Handler />);
    res.end(response);
  });
});

server.listen(8080);
console.log("server listening on http://localhost:8080/")


