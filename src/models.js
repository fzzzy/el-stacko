

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE posts (title TEXT, body TEXT, tags TEXT)");

  var stmt = db.prepare("INSERT INTO posts VALUES ($title, $body, $tags)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Test title " + i, "Test body " + i, "#yolo");
  }
  stmt.finalize();
});

function app() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM posts", function(err, rows) {
      console.log(rows);
      resolve({body: rows[0].body});
    });
  });
}

function another() {
  return new Promise(function (resolve, reject) {
    resolve({greeting: "how are you"});
  });
}

exports.app = app;
exports.another = another;


