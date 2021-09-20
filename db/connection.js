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

db.connect((err)=> {
    if(err) throw err;
    console.log('connect as id' + db.threadId)
});

db.query = util.promisify(db.query);
module.exports = db; 

module.exports = db;

