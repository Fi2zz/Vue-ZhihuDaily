const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("./request");
function runServer(onServerStarted) {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"]
    })
  );
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
      res.send(`Error:${err}`);
    }
    request({
      path: req.url
    })
      .then(reponse)
      .catch(reject);
  });
  app.listen(8000, "localhost", function(err) {
    if (err) {
      throw err;
    }
    console.log(`> Server is running on http://localhost:8000`);
    if (!err) {
      onServerStarted();
    }
  });
}

module.exports = runServer;
