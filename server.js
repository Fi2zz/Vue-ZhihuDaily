const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')


const client = require('./http-client');
const cheerio = require('cheerio')
const host = "news-at.zhihu.com";
const api = `/api/`;
let level = 4;
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}))

//处理跨域
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   next();
// });


app.get('*', (req, res) => {
  //获取当前的路由url
  //https://github.com/search?utf8=%E2%9C%93&q=%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5+%E7%88%AC%E8%99%AB&type=
  // https://github.com/izzyleung/ZhihuDailyPurify
  let route = req.url.substr(1);
  let options = {
    host: host,
    path: `${api}`
  };


  //
  // if(req.url ==='/'){
  //
  //   res.send('hello ecs')
  // }



  if (route === '/prefetch-image') {
    level = 7;
    options.path = `${api}${level}/start-image/1080*1766`;
    options.data = {};
    client(options).then(response => {
      res.send(JSON.parse(response))
    }).then(err => res.send(`Error:${err}`))
  }
  if (route === 'latest') {
    level = 4;
    options.path += `${level}/news/latest`;
    options.data = {};
    client(options).then(response => {
      res.send(JSON.parse(response))
    }).catch(err => res.send(`Error: ${err}`));
  }

  if (/^before/.test(route)) {
    let level = 4;
    options.path += `${level}/news/${route}`;
    options.data = ''
    client(options).then(body => {
      res.send(JSON.parse(body))
    })
  }


  if (/^story(\/)(\S)/.test(route)) {
    level = 4;
    let params = req.url.split('/');
    let length = params.length;
    console.log({params})
    let lastParam = params[length - 1]
    //请求文章
    if (length <= 3) {
      options.path += `${level}/news/${getStoryId(req)}`
      options.data = {};
      client(options).then(response => {
        let data = JSON.parse(response);
        res.send(data)
      }).then(err => res.send(`Error:${err}`))
    }
    //文章评论
    if (length <= 4 && lastParam === 'comments') {

      options.path += `${level}/story/${getStoryId(req)}/long-comments`;
      options.data = '';
      client(options).then(response => {
        res.send(JSON.parse(response))
      }).then(err => {
        res.send(err)
      })
    }
  }
  //文章额外信息，如评论点赞等
  if (/^(story-extra)/.test(route)) {
    let level = 4
    options.path += `${level}/story-extra/${getStoryId(req)}`;
    options.data = '';
    // console.log(options.path)
    client(options).then(response => {
      res.send(JSON.parse(response))
    }).then(err => {
      res.send(`Error:${err}`)
    })
  }

  if (route === 'more-info') {

  }

  let info = {
    route: route,
    query: req.query
  };
  for (let key in options) {
    info[key] = options[key]
  }

  console.log(info)

});

function getStoryId(req) {
  let array = req.params[0].trim().split('/');
  let getId = array[2].split('&');
  return getId[0];
}

// let address = '127.0.0.1'//'60.205.167.155'

let address ='60.205.167.155'

app.listen(8000,address, function () {
  // console.log('> Server is Running on http://'+address)
  console.log(`> Server is running on http://localhost:8000`)
});



