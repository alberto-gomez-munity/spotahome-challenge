var express = require('express');
var request = require('request');
var app = express();
var path = require('path');

// Static files
app.use(express.static('public'));

app.get('/proxy', function (req, res){
    
    var url = req.query.url
    var ids = req.query.ids

    if(ids){
        var idsQuery = '';
        ids.forEach((id, i) => {
            (i == 0 ? idsQuery += `?ids[]=${id}` : idsQuery +=`&ids[]=${id}`);
        })
        url = `https://staging.spotahome.com/api/public/listings/search/homecards_ids${idsQuery}`;
    }
    
    // localhost:8080/proxy?url=
    // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    
    // PIPE Response
    request({  
        url: url,
        method: "GET"
    }).pipe(res)
});

app.listen(8080);