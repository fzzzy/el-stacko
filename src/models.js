

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, body TEXT, tags TEXT)");

  var stmt = db.prepare("INSERT INTO posts VALUES (null, $title, $body, $tags)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Test title " + i, "Test body " + i, "#yolo");
  }
  stmt.finalize();
});

function app() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM posts", function(err, rows) {
      resolve({posts: rows});
    });
  });
}

function another() {
  return new Promise(function (resolve, reject) {
    resolve({greeting: "how are you"});
  });
}

function post(state) {
  return new Promise(function (resolve, reject) {
    var q = db.prepare("SELECT * FROM posts WHERE id = $id");
    q.get(state.postId, function (err, row) {
      resolve(row);
    });
  });
}

exports.app = app;
exports.another = another;
exports.post = post;

