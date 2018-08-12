let http = require("http");
const headers = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
};
const host = "news-at.zhihu.com";
module.exports = function(url) {
  let options = {
    port: 80,
    host: host,
    path: url,
    method: "GET",
    headers: headers,
    encoding: null
  };
  return new Promise((resolve, reject) => {
    let body = "";
    let req = http.request(options, res => {
      res.on("data", chunk => (body += chunk));
      res.on("end", () => {
        resolve(body);
      });
      res.on("error", err => reject(err));
    });
    req.end();
  });
};
