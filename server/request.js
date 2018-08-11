let http = require("http");
const querystring = require("querystring");
const headers = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
};
const host = "news-at.zhihu.com";
//http请求客户端
module.exports = function (opts) {
  let method = opts.method ? opts.method.toLowerCase() : "get";
  let https = opts.https || false;
  let data = opts.data ? querystring.stringify(opts.data) : "";
  if (method === "post") {
    headers["Content-Length"] = Buffer.byteLength(data); //返回字符串实际占据的字节长度
  }
  if (opts.headers) {
    for (let key in opts.headers) {
      headers[key] = opts.headers[key];
    }
  }
  let options = {
    port: method === "post" ? "8097" : 80,
    host: host,
    path: opts.path + data,
    method: method.toUpperCase(),
    headers: headers
  };
  if (https) {
    http = require("https");
    options.port = 443;
  }
  if (method === "get") {
    options.encoding = null;
  }
  return new Promise((resolve, reject) => {
    let body = "";
    let req = http.request(options, res => {
      res.on("data", chunk => (body += chunk));
      res.on("end", () => {
        resolve(body);
      });
      res.on("error", err => reject(err));
    });
    if (method === "post") {
      req.write(data);
    }
    req.end();
  });
};
