

exports.main = function main() {
  return new Promise(function (resolve, reject) {
    resolve({hello: "world"});
  });
}

exports.content = exports.main;
exports.summary = exports.main;
exports.tag = exports.main;
exports.data = exports.main;
exports.meta = exports.main;
exports.tags = exports.main;
exports.shot = exports.main;
exports.newframe = exports.main;

