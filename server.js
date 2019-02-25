var express = require('express');
var request = require('request');
var app = express();
var path = require('path');

// Static files
app.use(express.static('public'));

app.get('/proxy', function (req, res){
    
    // localhost:8080/proxy?url=
    // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var url = decodeURIComponent(req.query.url)
    
    // PIPE Response
    request({  
        url: url,
        method: "GET"
    }).pipe(res)
    
});

app.listen(8080);