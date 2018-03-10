const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const getIp = require("./getIp");

//获取本机ip

const client = require("./http-client");
const host = "news-at.zhihu.com";
const api = `/api/`;
let level = 4;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"]
  })
);
app.get("*", (req, res) => {
  //获取当前的路由url
  //https://github.com/search?utf8=%E2%9C%93&q=%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5+%E7%88%AC%E8%99%AB&type=
  // https://github.com/izzyleung/ZhihuDailyPurify
  let route = req.url.substr(1);
  let options = {
    host: host,
    path: `${api}`
  };
  if (route === "/prefetch-image") {
    level = 7;
    options.path = `${api}${level}/start-image/1080*1766`;
    options.data = {};
    client(options)
      .then(response => {
        res.send(JSON.parse(response));
      })
      .then(err => res.send(`Error:${err}`));
  }
  if (route === "latest" || req.url === "/") {
    level = 4;
    options.path += `${level}/news/latest`;
    options.data = {};
    client(options)
      .then(response => {
        res.send(JSON.parse(response));
      })
      .catch(err => res.send(`Error: ${err}`));
  }

  if (/^before/.test(route)) {
    let level = 4;
    options.path += `${level}/news/${route}`;
    options.data = "";
    client(options).then(body => {
      res.send(JSON.parse(body));
    });
  }
  if (/^story(\/)(\S)/.test(route)) {
    level = 4;
    let params = req.url.split("/");
    let length = params.length;
    let lastParam = params[length - 1];
    //请求文章
    if (length <= 3) {
      options.path += `${level}/news/${getStoryId(req)}`;
      options.data = {};
      client(options)
        .then(response => {
          let data = JSON.parse(response);
          res.send(data);
        })
        .then(err => res.send(`Error:${err}`));
    }
  }
  //文章评论
  if (/^(comment)/.test(route)) {
    let id = req.query.id;
    let type = req.query.type;
    options.data = "";
    let short = {},
      long = {};
    for (let key in options) {
      short[key] = options[key];
      long[key] = options[key];
    }
    let level = 4;
    if (type === "long") {
      options.path += `${level}/story/${id}/long-comments`;
      client(options)
        .then(response => {
          res.send(JSON.parse(response));
        })
        .then(err => {
          res.send(err);
        });
    } else if (type === "short") {
      options.path += `${level}/story/${id}/short-comments`;
      client(options)
        .then(response => {
          res.send(JSON.parse(response));
        })
        .then(err => {
          res.send(err);
        });
    }
  }
  //文章额外信息，如评论点赞等
  if (/^(story-extra)/.test(route)) {
    let level = 4;
    options.path += `${level}/story-extra/${getStoryId(req)}`;
    options.data = "";
    // console.log(options.path)
    client(options)
      .then(response => {
        res.send(JSON.parse(response));
      })
      .then(err => {
        res.send(`Error:${err}`);
      });
  }
  //待完成
  if (route === "more-info") {
  }

  let info = {
    route: route,
    query: req.query
  };
  for (let key in options) {
    info[key] = options[key];
  }

  // console.log(info)
});

//简单url切割,再线上使用可能出现隐患
function getStoryId(req) {
  let array = req.params[0].trim().split("/");
  let getId = array[2].split("&");
  return getId[0];
}

app.listen(8000, getIp(), function() {
  console.log(`> Server is running on http://${getIp()}:8000`);
});
