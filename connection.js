const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'user123',
  database: 'node_js_projects'
});

db.connect(function(err){
  if(err) {
      console.log(err);
  } else {
      console.log('connected to mySQL');
  }
});


module.exports = db;
