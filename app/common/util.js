const config = require("./config");


const formUrlEncoded = x =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const getUrl = (uri) => {
  return `${config.serverUrl}${uri}`;
};


module.exports = {getUrl, formUrlEncoded};