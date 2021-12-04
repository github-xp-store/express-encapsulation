function parseHandle(prefix, urls, handle) {
  if (!handle) return;
  handle.stack.forEach((layer) => {
    console.log(layer);

    if (layer.name === 'router') {
      let llPrefix = prefix;
      const matchRes = layer.regexp.toString().match(/\\(\/[^/?]*)\\\//);
      if (matchRes) {
        llPrefix += matchRes[1];
      }
      parseHandle(llPrefix, urls, layer.handle);
    }
    if (layer.name === 'bound dispatch') {
      urls.push(prefix + layer.route.path);
    }
  });
}

function routerPathHandle(app) {
  const urls = [];
  parseHandle('', urls, app._router);
  global.routerPath = urls.filter((path) => path.indexOf('*') < 0);
}

module.exports = routerPathHandle;
