const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
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
