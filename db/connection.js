const util = require('util');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'work_db'
    },
    console.log(`Connected to the work_db database.`)
);

connection.connect((err)=> {
    if(err) throw err;
    console.log('connect as id' + connection.threadId)
});

connection.query = util.promisify(connection.query);
module.exports = connection; 

