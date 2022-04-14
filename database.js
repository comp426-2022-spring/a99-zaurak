const db = require('better-sqlite3')('user.db'); 

db.prepare("CREATE TABLE IF NOT EXISTS userdata ( id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT) ").run();
db.prepare("CREATE TABLE IF NOT EXISTS coviddata ( id INTEGER PRIMARY KEY, date TEXT, location TEXT, newconfirmed INTEGER, newdeaths INTEGER) ").run();

const user = db.prepare("SELECT * FROM userdata where username = ?").get('username_')

if (user === undefined) {
    db.prepare("INSERT INTO userdata (username, password, email) VALUES (?, ?, ?)").run('username_', 'password', 'email@email.com');
}

module.exports = db; 