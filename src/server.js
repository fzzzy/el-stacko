

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

  if (pth.indexOf(modelspath) === 0) {
    let modelname = pth.slice(modelspath.length);
    let subpath = url.parse(query.path + "?" + query.query, true);
    models[modelname]({path: subpath.pathname, query: subpath.query}).then(function (data) {
      res.setHeader(content_type, jsontype);
      res.end(JSON.stringify(data));
    });
    return;
  }

  Router.run(routes.routes, req.url, function (Handler, state) {
    let appname = "";
    for (let r of state.routes) {
      if (r.name) {
        appname = r.name;
        break;
      }
    }

    if (appname === '' || models[appname] === undefined) {
      res.writeHead(404);
      res.end(not_found);
      return;
    }

    models[appname](state).then(function (data) {
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

server.listen(8080);
console.log("server listening on http://localhost:8080/")


