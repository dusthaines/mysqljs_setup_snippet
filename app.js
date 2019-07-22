// in your application initialization file such as app.js

// 
// other require items here as well like express maybe?
// 
const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'local_user',
  password: process.env.DB_PASSWORD || 'local_password',
  database: process.env.DB_NAME || 'local_database',
  multipleStatements: true, 
  charset: 'utf8mb4' // necessary if you might need support for emoji characters
});

connection.on('connection', function (connection) {
  // handy for testing
  console.log('Pool id %d connected', connection.threadId);
});

connection.on('enqueue', function () {
  // handy for testing
  console.log('Waiting for available connection slot');
});

global.db = connection;

// 
// other app setup stuff here like app.set, app.engine, app.use, module.exports = app and all that good stuff
// 


// later… 
// everywhere else in your app, use the global db variable when running queries
// ../new_users.js or similar maybe?

const _create_user = (user_payload) => {
  db.query(
    'INSERT INTO users SET ?', user_payload, function(error, results, fields) {
      if (error) throw error;
      console.log(results);
    });
  }


  // maybe we are in a module that has access to 
  // the request object so we can use something
  // that has come via POST
  // 
  // here is a manual object as a placeholder…
  
  let new_user = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'j.smith@example.com',
    password: 'keyboard_cat'
  }

  _create_user(new_user);
