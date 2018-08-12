const express = require("express");
const get = require("./get");

function runServer(onServerStarted) {
  const app = express();
  //處理開發期間跨域
  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  app.get("*", (req, res) => {
    function reponse(response) {
      let parse;
      try {
        parse = JSON.parse(response);
      } catch (e) {
        parse = response;
      }
      res.send(parse);
    }

    function reject(err) {
      console.log("error", err);
      res.send(`Error:${err}`);
    }

    get(req.url)
      .then(reponse)
      .catch(reject);
  });
  app.listen(8000, "localhost", function(err) {
    if (err) {
      throw err;
    }
    console.log(`> Server is running on http://localhost:8000`);
    if (!err && onServerStarted) {
      onServerStarted();
    }
  });
}

module.exports = runServer;
