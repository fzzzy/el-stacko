

let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js");

const jspath = "/js/",
  csspath = "/css/",
  favicopath = "/favicon.ico",
  NOT_FOUND = "Not Found",
  footer = "</body></html>",
  script_head = "<script>Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) { React.render(React.createElement(Handler, ",
  script_foot = "), document) });</script>";

let server = http.createServer(function (req, res) {
  let pth = url.parse(req.url).pathname;

  if (pth.indexOf(jspath) === 0 || pth.indexOf(csspath) === 0 || pth === favicopath) {
    let filename = path.join(__dirname, pth);
    fs.exists(filename, function(exists) {
      if (exists) {
        if (filename.endsWith('.js')) {
          res.setHeader("Content-type", "application/javascript");
        } else if (filename.endsWith('.css')) {
          res.setHeader("Content-type", "text/css");
        } else if (filename.endsWith('.ico')) {
          res.setHeader("Content-type", "image/x-icon");
        }
        fs.createReadStream(filename).pipe(res);
      } else {
        res.writeHead(404); res.end(NOT_FOUND);
      }
    });
    return;
  }

  Router.run(routes.routes, req.url, function (Handler, state) {
    models.get_some_state().then(function(data) {
      let response = React.renderToString(<Handler {...data} />),
        footer_index = response.indexOf(footer),
        header = response.slice(0, footer_index);

      res.end(header + script_head + JSON.stringify(data) + script_foot + footer);
    })
  });
});

server.listen(8080);
console.log("server listening on http://localhost:8080/")


