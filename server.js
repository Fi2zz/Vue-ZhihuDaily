const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const client = require('./http-client');
const cheerio = require('cheerio')
const host = "news-at.zhihu.com";
const api = `/api/`;
let level = 4;
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    let route = req.url.substr(1);
    let reg = /^article\//;
    let options = {
        host: host,
        path: `${api}`
    };


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

    if (/^story(\/)(\S)/.test(route)) {
        level = 4;
        let params = req.url.split('/');
        let length = params.length;
        console.log(length, params)
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
    console.log('current route:', route);
    console.log('current route query:', req.query);
    console.log('request options:\n' + JSON.stringify(options))
});

function getStoryId(req) {
    let array = req.params[0].trim().split('/');
    let getId = array[2].split('&');
    return getId[0];


}

app.listen(80);



