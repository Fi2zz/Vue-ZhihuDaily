const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const client = require('./http-client');
const cheerio = require('cheerio')
const host = "news-at.zhihu.com";
const api = `/api/4/`;
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    let route = req.url;
    let reg = /\/article\//;
    let options = {
        host: host,
        path: `${api}`
    };


    if(route){}


    
    if (route === '/latest') {
        options.path += `news/latest`;
        options.data = {};
        client(options).then(response => {
            res.send(JSON.parse(response))
        }).catch(err => res.send(`Error: ${err}`));
    }
    if (reg.test(route)) {
        let array = req.params[0].trim().split('/');
        let getId = array[2].split('&');
        let id = getId[0];
        options.path += `news/${id}`
        options.data = {};
        client(options).then(response => {
            let data = JSON.parse(response);
            res.send(data)
        }).then(err => res.send(`Error:${err}`))
    }

    console.log('current route:', route);
    console.log('request options:\n' + JSON.stringify(options))
});


app.listen(80);



