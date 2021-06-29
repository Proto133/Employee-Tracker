const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 3306

});

//Couldn't for the life of me figure out why I couldn't get rid of this error message, so I figured I'd have fun with it. 
//UPDATE: FIXED IT!!
connection.on('error', (err) => {
    console.error("One small thing . . ." + " \n and it's probably nothing . . . \n\n" +
        "\u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \n" +
        "\u{1F6A8} ERROR:", err.message +
        "\u{1F6A8} \n" + "\u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \u{1F6A8} \n");
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


module.exports = connection;