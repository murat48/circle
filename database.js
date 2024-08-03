const sqlite3 = require('sqlite3').verbose();

// Veritabanı oluşturma veya var olanı açma
const db = new sqlite3.Database('my-database.db', (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('SQLite veritabanına bağlı');
    }
});

// Örnek bir tablo oluşturma
db.serialize(() => {
    //   db.run(`CREATE TABLE IF NOT EXISTS users (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT NOT NULL,
    //     email TEXT NOT NULL UNIQUE
    //   )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
    Userid INTEGER PRIMARY KEY AUTOINCREMENT,
    UserName TEXT NOT NULL,
    Walletid TEXT NOT NULL UNIQUE,
    Address TEXT NOT NULL
  )`);
});
module.exports = db;
