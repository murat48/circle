const sqlite3 = require('sqlite3').verbose();

// Veritabanı oluşturma veya var olanı açma
const db = new sqlite3.Database('my-database.db', (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('SQLite veritabanına bağlı');
    }
});

// Veritabanına veri ekleme
const insertData = (name, price, description) => {
    const sql = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;

    db.run(sql, [name, price, description], function (err) {
        if (err) {
            return console.error('Veri eklenirken hata oluştu:', err.message);
        }
        console.log(`Yeni kayıt eklendi. ID: ${this.lastID}`);
    });
};

// Örnek veri ekleme
insertData('Laptop', 1200.99, 'Yüksek performanslı bir laptop');
insertData('Mouse', 25.50, 'Kablosuz optik mouse');

// Veritabanı bağlantısını kapatma
db.close((err) => {
    if (err) {
        console.error('Veritabanı kapatılırken hata oluştu:', err.message);
    } else {
        console.log('Veritabanı bağlantısı kapatıldı');
    }
});
