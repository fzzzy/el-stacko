

let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js"),
  request = require("superagent");

const jspath = "/js/",
  jsext = ".js",
  csspath = "/css/",
  modelspath = "/models/",
  cssext = ".css",
  favicopath = "/favicon.ico",
  favicoext = ".ico",
  newframepath = "/newframe.html",
  content_type = "Content-type",
  jstype = "application/javascript",
  csstype = "text/css",
  favicotype = "image/x-icon",
  jsontype = "application/json",
  accept = "Accept",
  not_found = "Not Found",
  footer = "</body></html>",
  script = `
function got_data(Handler, data) {
  React.render(React.createElement(Handler, data), document);
}

Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) {
  if (cached_data) {
    var _d = cached_data;
    cached_data = null;
    got_data(Handler, _d);
    return;
  }

  var appname = state.routes.filter(function (r) { return !!r.name })[0].name;
  var querystring = "";
  for (var n in state.query) {
    querystring += n + "=" + state.query[n] + "&";
  }
  querystring = querystring.slice(0, querystring.length - 1);
  console.log("path query", state.pathname, querystring);
  request.get(
    url.format({pathname: "/models/" + appname, query: {path: state.pathname, query: querystring}})
  ).set(
    "Accept", "application/json"
  ).end(function (r) {
    got_data(Handler, r.body);
  });
});
`;

let server = http.createServer(function (req, res) {
  let parsed = url.parse(req.url, true),
    pth = parsed.pathname,
    query = parsed.query;

  console.log(req.method, pth, query);

  if (req.method === "GET" && (pth.indexOf(jspath) === 0 || pth.indexOf(csspath) === 0 || pth === favicopath)) {
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

  if (pth.indexOf(newframepath) === 0) {
    res.end("newframe.html");
    return;
  }

  if (pth.indexOf(modelspath) === 0) {
    let modelname = pth.slice(modelspath.length);
    let subpath = {};
    if (query.path === undefined) {
      subpath.pathname = pth;
      subpath.query = {};
    } else {
      subpath = url.parse(query.path + "?" + query.query, true);
    }
    let body = "";
    req.on('data', function(chunk) {
      body = body + chunk;
    });
    req.on('end', function() {
      if (body.length && body[0] === "{") {
        body = JSON.parse(body);
      }
      models[modelname](
        {method: req.method,
          path: subpath.pathname,
          query: subpath.query,
          body: body}
      ).then(function (data) {
        res.setHeader(content_type, jsontype);
        res.end(JSON.stringify(data));
      });
    });
    return;
  }

  Router.run(routes.routes, req.url, function (Handler, state) {
    let appnames = state.routes.filter((r) => !!r.name);

    if (appnames.length === 0 || models[appnames[0].name] === undefined) {
      res.writeHead(404);
      res.end(not_found);
      return;
    }

    console.log("App:", appnames[0].name);

    models[appnames[0].name](
      {method: req.method,
        path: state.path,
        query: state.query}
    ).then(function (data) {
      try {
        let response = React.renderToString(<Handler {...data} />),
          footer_index = response.indexOf(footer),
          header = response.slice(0, footer_index);
  
        res.setHeader(content_type, "text/html; charset=utf-8");
        res.end(
          header +
          "<script>var cached_data = " + JSON.stringify(data) + ";" +
          script +
          "</script>" +
          footer);
      } catch (e) {
        res.setHeader(content_type, "text/plain; charset=utf-8");
        res.end(e.stack);
      }
    })
  });
});

server.listen(10080);
console.log("server listening on http://localhost:10080/")


