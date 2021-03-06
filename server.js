var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'njain071',
    database: 'njain071',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

var pool = new Pool(config);

function createTemplate(data) {
    
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
        <!doctype html>
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <link href="/ui/style.css" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div class="container">
                    <a href='/'>Home</a>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                        ${content}
                    </div>
                    <hr/>
                    <div id="comments_box">
                    </div>
                    <h4>Comments</h4>
                    <div id="comments">
                        <center>Loading comments...</center>
                    </div>
                </div>
                <script type="text/javascript" src="/ui/articles.js"></script>
            </body>
        </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'This is a random string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err);
      } else {
        //   res.status(200).send('User successfully created: ' + username);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.parse('{"message":"User successfully created"}'));
      }
   });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            if(result.rows.length === 0) {
                // res.status(403).send('username/password is invalid');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.parse('{"message":"username/password is invalid"}'));
            }
            else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString) {
                    
                    //set the session
                    req.session.auth = {userId: result.rows[0].id};
                    
                    // res.status(200).send('Credentials are correct!');
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.parse('{"message":"Credential Correct"}'));
                }
                else {
                    // res.status(403).send('username/password is invalid');
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.parse('{"error":"username/password is invalid"}'));
                }
            }
        }
    });
});

app.get('/check-login', function(req, res) {
    if(req.session && req.session.auth && req.session.auth.userId) {
        pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
            if(err) {
                res.status(500).send('err.toString()');
            }
            else {
                res.status(200).send("User " + result.rows[0].username + " logged in");
            }
        });
    }
    else {
        res.status(400).send('You are not logged in');
    }
});

app.get('/logout', function(req, res) {
    delete req.session.auth;
    res.status(200).send('Logged out');
});

app.post('/submit-comment/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    if(req.session && req.session.auth && req.session.auth.userId) {
        pool.query("SELECT * FROM article WHERE title = $1", [articleName], function (err, result) {
            if(err) {
                res.status(500).send(err.toString());
            }
            else {
                if(result.rows.length === 0) {
                    res.status(404).send('Article not found');
                }
                else {
                    var articleId = result.rows[0].id;
                    pool.query("INSERT INTO comment (article_id, user_id, comment) VALUES ($1, $2, $3)",
                        [articleId, req.session.auth.userId, req.body.comment], function (err, result) {
                        if(err) {
                            res.status(500).send(err.toString());
                        }
                        else {
                            res.status(200).send('Comment submitted successfully.');
                        }
                    });
                }
            }
        });
    }
    else {
        res.status(403).send('only loggedin users can coomment!');
    }
});

app.get('/get-comments/:articleName', function(req, res) {
   //endpoint to get all the comments 
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id', [req.params.articleName], function (err, result) {
       if(err) {
           res.send(err.toString());
       }
       else {
           res.send(JSON.stringify(result.rows));
       }
   });
});

app.get('/get-articles', function (req, res) {
    pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articleName', function (req, res) { // this is the feature of express framework
    // This is the object of articles names which we will pass in url bar
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result) {
        if(err) {
        res.status(500).send(err.toString());
        }
        else {
            if(result.rows.length === 0) {
                res.status(404).send('article not found.');
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/articles.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'articles.js'));
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
