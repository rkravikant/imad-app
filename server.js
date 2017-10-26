var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');

var config={
    user:'ravikantvermahbti',
    database:'ravikantvermahbti',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json()); // loading json content to req body

function createtemplate(object)
{
    var date = object.date;
    var title = object.title;
    var content = object.content;
    var heading = object.heading;
    
    var template=`
    <html>
    <head>
    <title>
    ${title}
    </title>
    <meta name="viewport" content="width-device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet"/>
    </head>
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
    ${date.toDateString()}
    </div>
    <div>
    ${content}
    </div>
    
    </div>
    </body>
    </html>`;
    
    return template;
}

//create pool some where globally so its lifetime lasts for as long as your app is running
var pool = new Pool(config);

app.get('/test-db', function (req, res) {
pool.query('select*from test', function (err, result){
    if(err){
    res.status(500).send(err.toString());
    }
    else{
    res.send(JSON.stringify(result.rows)); // result is an object returned by database which will print evry thing like command rows info ..
    }                                      // so we only printing rows because we need only data
});

});


var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
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

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[];
app.get('/submit-name', function (req, res) {// url like submit-name?name=xxxx
    var name = req.query.name;
    names.push(name);
    
  res.send(JSON.stringify(names));
});


app.get('/articles/:articlename', function (req, res) {
  //  var articlename=req.params.articlename; // there is one more method for sending data to server named query parameter 
    // pool.query("select*from article where title='"+req.params.articlename+"'", function (err, result) this is vulenarable to attack
   
    pool.query("select*from article where title=$1", [req.params.articlename], function (err, result){ // by this we can insert many $1,$2..
    if(err){                           // this is secure way, not allows sql injection, which was in upper case // and there values in array []
    res.status(500).send(err.toString());
    }
    else{
        if(result.rows.length === 0){
            res.status(404).send("requested article is not found");
        }
        else{
          var articledata = result.rows[0];
          res.send(createtemplate(articledata));
        }
    
    }                                      
});
  
});

app.post('/signup', function(req, res){ // we dont send password by get because it will be printed in logs, if one has acces to logs can see password
// extracting username and password from request body
    var username = req.body.username;
    var password = req.body.password;
// now where is this data comming from in req body and what is format of data, lets take json type, so we have to tell express app to when it see the json content in request it will put it into req body that is done with the help of body parser.
   
//now for making post request we have to do it from main.js but for practice we can do it from curl tool, curl will print the whole html in cmd(if we use from ssh) like browser rather than rendering.we can see whole detail like which page is being requested and what protocols, req method being used. so by curl we can send post request(with data) without any page(web-html..)

    var salt = crypto.randomBytes(128).toString('hex');
    var dbstring = hash(password, salt);
    
    pool.query("insert into 'user' (password, username) values ($1,$2)", [username, dbstring], function (err, result){ // "user" because user is also a keyword in postgress
    if(err){                           // this is secure way, not allows sql injection, which was in upper case // and there values in array []
    res.status(500).send(err.toString());
    }
    else{
            res.send("user succesfully created"+username);
        }
    
});
});

app.post('/login', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var dbstring = hash(password, salt);
    
    pool.query("select * from 'user' where username =$1)", [username], function (err, result){
    if(err){                         
    res.status(500).send(err.toString());
    }
    else{
          if(result.rows[0].length() === 0){
            res.status(404).send("Requested user name is not registered");
            }
            else{
            var dbstring = result.rows[0].password;
              var salt = dbstring.split("$")[2]; // salt is 3rd element in array
              var hashedpassword = hash(password,salt);
            if(dbstring === hashedpassword)  
            res.send("credential matched   Welcome");
            else{
                res.status(404).send("Entered password is incorrect");
            }
        }
    }
    
});
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');// will apend input to salt value and convert it into 512byte string by applying 10000 times this hash funion.
    return ["pbkdf2", "10000", "salt", "hashed.toString('hex')"].join($); // converting reurned bytes to readable string using hexadecimal encoding
    
}

app.get('/hash/:input', function (req, res) {
   var hashedstring = hash(req.params.input,'this is a random string as salt');
  res.send(hashedstring);
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
