

exports.main = function main(state) {
  return new Promise(function (resolve, reject) {
    resolve({hello: "world"});
  });
}

exports.shot = function shot(state) {
  let key = state.params.shotId + "/" + state.params.shotDomain,
    data = state.model_map.get(key),
    meta = state.meta_map.get(key);

  return new Promise(function (resolve, reject) {
    resolve({data: data, meta: meta, identifier: key});
  });
}

exports.content = function content(state) {
  let key = state.params.contentId + "/" + state.params.contentDomain,
    data = state.model_map.get(key),
    meta = state.meta_map.get(key);

  return new Promise(function (resolve, reject) {
    resolve({data: data, meta: meta, identifier: key});
  });    
}

exports.summary = exports.main;
exports.tag = exports.main;
exports.data = exports.main;
exports.meta = exports.main;
exports.tags = exports.main;
exports.newframe = exports.main;

