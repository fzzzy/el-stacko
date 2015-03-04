

let sqlite3 = require('sqlite3').verbose(),
 db = new sqlite3.Database(':memory:');

db.serialize(function() {
  let tag = "yolo";
  db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, body TEXT, tags TEXT)");

  let stmt = db.prepare("INSERT INTO posts VALUES (null, $title, $body, $tags)");
  for (let i = 1; i < 11; i++) {
    stmt.run("Test title " + i, "Test body " + i, tag);
    if (tag === "yolo") {
      tag = "asdf";
    } else {
      tag = "yolo";
    }
  }
  stmt.finalize();
});

exports.app = function app() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM posts", function (err, rows) {
      resolve({posts: rows});
    });
  });
}

exports.newpost = function newpost(state) {
  console.log("newpost", state);
  if (state.method === "GET") {
    return new Promise(function (resolve, reject) {
      resolve({greeting: "how are you"});
    });
  } else if (state.method === "PUT") {
    return new Promise(function (resolve, reject) {
      let stmt = db.prepare("INSERT INTO posts VALUES (null, $title, $body, $tags)");
      stmt.run(state.body.title, state.body.body, state.body.tags);
      stmt.finalize(function () {
        resolve({put: "ok"});
      });
    });
  } else {
    return new Promise(function(resolve, reject) {
      reject();
    });
  }
}

exports.post = function post(state) {
  return new Promise(function (resolve, reject) {
    let q = db.prepare("SELECT * FROM posts WHERE id = $id"),
      pth = state.query.path && state.query.path || state.path,
      pathsplit = pth.split("/");
    q.get( pathsplit[pathsplit.length - 1], function (err, row) {
      resolve(row);
    });
  });
}

exports.tag = function tag(state) {
  return new Promise(function (resolve, reject) {
    let q = db.prepare("SELECT * FROM posts WHERE tags LIKE $match");
    q.all("%" + state.query.name + "%", function (err, rows) {
      resolve({tag: state.query.name, posts: rows});
    });
  });
}

