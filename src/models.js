

function get_some_state() {
  return new Promise(function (resolve, reject) {
    resolve({greeting: "hi there"});
  });
}

exports.get_some_state = get_some_state;


