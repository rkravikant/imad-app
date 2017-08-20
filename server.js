var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'article1':{
        date:`string,string`,
        title:'about article one',
        heading:'heading for article1',
        content:`<h>writing something</h>
        <p>this is articleone which is trying to do things dynamically </p>
        <h>heading 2</h>`
        
    },
     'article2':{
        date:`string,string`,
        heading:'heading for article2',
        title:'about article one',
        content:`<h>writing something</h>
        <p>this is articleone which is trying to do things dynamically </p>
        <h>heading 2</h>`
        
    },
     'article3':{
        date:`string,string`,
        title:'about article one',
        heading:'heading for article3',
        content:`<h>writing something</h>
        <p>this is articleone which is trying to do things dynamically </p>
        <h>heading 2</h>`
        
    }
};

function createtemplate(object)
{
    var date=object.date;
    var title=object.title;
    var content=object.content;
    var heading=object.heading;
    var template= `
    <html>
    <title>
    ${title}
    <title/>
    <meta name="viewport" content="width-device-width, initial-scale=1" >
    <link href="/ui/style.css" rel="stylesheet">
    <body>
    <div class="container">
    <div>
    <a href="/">Home</a>
    </div>
    <h>
    ${heading}
    </h>
    <div>
    
    </div>
    <div>
    ${content}
    </div>
    
    </div>
    </body>
    </html>`;
    
    return template;
};

app.get('/:articlename', function (req, res) {
    var articlename=req.param.articlename;
  res.send(createtemplate(articles[articlename]));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/check.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'check.html'));
});

app.get('/ui/ab.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ab.jpg'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
