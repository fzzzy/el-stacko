

function app(state) {
  return new Promise(function (resolve, reject) {
    resolve({greeting: "hi there"});
  });
}

function another(state) {
  return new Promise(function (resolve, reject) {
    resolve({greeting: "how are you"});
  });
}

exports.app = app;
exports.another = another;


