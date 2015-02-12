

let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js");

const jspath = "/js/",
  jsext = ".js",
  csspath = "/css/",
  cssext = ".css",
  favicopath = "/favicon.ico",
  favicoext = ".ico",
  content_type = "Content-type",
  jstype = "application/javascript",
  csstype = "text/css",
  favicotype = "image/x-icon",
  not_found = "Not Found",
  footer = "</body></html>",
  script_head = "<script>Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) { React.render(React.createElement(Handler, ",
  script_foot = "), document) });</script>";

let server = http.createServer(function (req, res) {
  let pth = url.parse(req.url).pathname;

  if (pth.indexOf(jspath) === 0 || pth.indexOf(csspath) === 0 || pth === favicopath) {
    let filename = path.join(__dirname, pth);
    fs.exists(filename, function(exists) {
      if (exists) {
        if (filename.endsWith(jsext)) {
          res.setHeader(content_type, jstype);
        } else if (filename.endsWith(cssext)) {
          res.setHeader(content_type, csstype);
        } else if (filename.endsWith(favicoext)) {
          res.setHeader(content_type, favicotype);
        }
        fs.createReadStream(filename).pipe(res);
      } else {
        res.writeHead(404); res.end(not_found);
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


