  const express = require('express');
  const db = require('./connection');
  const app = express();
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  const path = require('path');
  



  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve('./public')));

  var obj={};
  const multer = require('multer');

  app.get('/', function(req,res){
      let sql = 'SELECT * FROM njstabell ORDER BY id DESC';
      db.query(sql, function(err, results){
          if(err) {
              throw err;
          } else {
              obj = {data: results};
              console.log(obj);
              res.render('index', obj)
          }
      });
  });

  const upload = require('./uploads');
  const { log } = require('console');

  app.post('/bra', upload.single('img'), function(req,res){
      const text1 = req.body.text1;
      const text = req.body.text;
      const img = "/uploads/"+req.file.filename;
      const sqlInsert = "INSERT INTO njstabell (text1,tag,text3) VALUES (?, ?, ?);"
      db.query(sqlInsert, [title, tag, img], (err, result)=> {
          if(err) {
              throw err;
          } else {
              res.redirect('/');
          }
      });
  });

  app.get('/login',function(req,res){
      res.render('login')
  });

  app.get('/register',function(req,res){
    console.log(req.session)
      //req.session.user = 'brian';
      res.render('register')
  });

  app.get('/inloga1',function(req,res){
      res.render('inloga1')
  });

  /*
  app.get('/profil',function(req,res){
      res.render('profil')
  });
  */

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
      secret: 'secret key',
      test: 'hej',
      resave: false,
      saveUninitialized: true
  }));

  app.use(express.static(path.join(__dirname, 'public')));


  app.post('/register', async function(req,res) {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password; 
      const sqlInstert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?);"
      db.query(sqlInstert, [username, email, password],function(err,results){
          if (err) {
              console.error("Error executing query:", err);
              res.status(50).send("An error occurred while creating the account.");
              res.redirect('/register')
          } else {
            const information = results[0];
            req.session.information = information; // 存储用户信息到 session
              res.redirect('/register')
          }
      });

  });

  app.post('/login', async function(req, res) {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }
    
      let sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], async function(err, results) {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("An error occurred while logging in.");
        } else if (results.length === 0) {
          res.status(401).send("Email or password is incorrect.");
        } else {
          const user = results[0];
          if (password == user.password) {
            req.session.user = user; // 存储用户信息到 session
            res.redirect("/inloga1")
          } else {
            res.status(401).send("Email or password is incorrect.");
          }
        }
      });
    });


    app.get('/profil', function(req, res) {
      if (req.session.user) {
        const user = req.session.user;
        let sql = 'SELECT * FROM njstabell ORDER BY id DESC';
        db.query(sql, function(err, results){
          if(err) {
            throw err;
          } else {
            obj = {data: results, user: user};
            console.log(obj);
            res.render('profil', obj)
          }
        });
      } else {
        res.redirect('register');
      }
    });
    
    app.post('/profil', upload.single('avatar'), function(req, res) {
      const id = req.body.id;
      const user = req.session.user;
      const username = req.body.username;
      const email = req.body.email;
      const address = req.body.address;
      const password = req.body.password;
      const mobile = req.body.mobile;
      let avatar = '';
        if (user && user.avatar) {
          avatar = user.avatar;
        }
    
      if (req.file) {
        avatar = req.file.filename;
      }
    
      let sqlUpdate = "UPDATE users SET username = ?, email = ?, address = ?, password = ?, mobile = ?, avatar = ? WHERE id = ?"
      db.query(sqlUpdate, [username, email, address, password, mobile, avatar, parseInt(id)], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send("An error occurred while updating the user.");
        } else {
          req.session.user = {
            id: id,
            username: username,
            email: email,
            address: address,
            password: password,
            mobile: mobile,
            avatar: avatar
          }
          res.redirect('/profil'); // Change this line
        }
      });
    });
    
    app.post('/user-upload', upload.single('img'), function(req,res){
      const text1 = req.body.text;
      const tag = req.body.tag;
      const username = req.body.username; 
      const img = "/uploads/"+req.file.filename;
      const sqlInsert = "INSERT INTO njstabell (text1, tag, text3) VALUES (?, ?, ?);"
      db.query(sqlInsert, [text1, tag, img], (err, result)=> {
          if(err) {
              console.log(err);
              throw err;
          } else {
              res.redirect('/profil');
          }
      });
  });
  
  app.get('/user-upload', function(req,res){
  let sql = 'SELECT * FROM njstabell ORDER BY id DESC';
  db.query(sql, function(err, results){
      if(err) {
          throw err;
      } else {
          obj = {data: results};
          console.log(obj);
          res.render('profil', obj)
      }
  });
});


app.post('/grid-aren', upload.single('img'), function(req,res){
  const text1 = req.body.text;
  const tag = req.body.tag;
  const username = req.body.username; 
  const img = "/uploads/"+req.file.filename;
  const sqlInsert = "INSERT INTO njstabell (text1, tag, text3) VALUES (?, ?, ?);"
  db.query(sqlInsert, [text1, tag, img], (err, result)=> {
      if(err) {
          console.log(err);
          throw err;
      } else {
          res.redirect('/bra');
      }
  });
});

app.get('/grid-aren', function(req,res){
  let sql = 'SELECT * FROM njstabell ORDER BY id DESC';
  db.query(sql, function(err, results){
      if(err) {
          throw err;
      } else {
          obj = {data: results};
          console.log(obj);
          res.render('index', obj)
      }
  });
});
app.get('/bra', function(req,res){
  let sql = 'SELECT * FROM njstabell ORDER BY id DESC';
  db.query(sql, function(err, results){
      if(err) {
          throw err;
      } else {
          obj = {data: results};
          console.log(obj);
          res.render('bra', obj)
      }
  });
});

app.post('/search', (req, res) => {
  const searchQuery = req.body.enamn;

  // Retrieve data from your source (database, file, etc.)
  const data = getDataFromYourSource(); // implement this function

  // Filter data based on searchQuery
  const filteredData = data.filter(item => item.author.includes(searchQuery));

  res.json(filteredData);
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.enamn;

  // Retrieve data from your source (database, file, etc.)
  const data = getDataFromYourSource(); // implement this function

  // Filter data based on searchQuery
  const filteredData = data.filter(item => item.author.includes(searchQuery));

  res.render('bra', { data: filteredData }); // assuming you have a view named 'search'
});



   

    app.get('/logout', function(req,res){
      req.session.destroy();
      res.redirect('/bra');
    });


  // 启动Web服务器
  app.listen(3000, function () {
    console.log('Server started on port 3000');
  });

