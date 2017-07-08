const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const client = require('./http-client');
const cheerio = require('cheerio')
const host = "news-at.zhihu.com";
const api = `/api/4/`;
app.use(bodyParser.urlencoded({extended: false}));
app.get('/cover', function () {
});
//最新消息
app.get('/latest', function (req, res) {
    let reqOpts = {
        host: host,
        path: `${api}news/latest`,
        data: {},
        // headers: {
        //     'Authorization': 'Bearer',
        //     'Referer': 'http://daily.zhihu.com/',
        // }
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    client(reqOpts).then(body =>{
        res.send(JSON.parse(body))
    }).catch(err => res.send(`Error: ${err}`));
});


//文章
app.get('/article/:id', function (req, res) {
    let reqOpts = {
        host: host,
        path: `${api}news/${req.params.id}`,
        data: {},
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    client(reqOpts).then(response => {
        let data =JSON.parse(response);
        res.send(data)
    }).then(err => res.send(`Error:${err}`))
});
app.listen(80, function () {
    console.log('run on http://localhost')
});




