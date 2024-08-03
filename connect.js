const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    "collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
    // Create the items table if it doesn't exist
    // db.run(`CREATE TABLE IF NOT EXISTS users (
    //     Userid INTEGER PRIMARY KEY AUTOINCREMENT,
    //     UserName TEXT NOT NULL UNIQUE,
    //     Walletid TEXT NOT NULL UNIQUE,
    //     Address TEXT NOT NULL UNIQUE  
    //   )`),
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
        Userid INTEGER PRIMARY KEY AUTOINCREMENT,
        UserName TEXT NOT NULL UNIQUE,
        Walletid TEXT NOT NULL UNIQUE,
        Address TEXT NOT NULL UNIQUE
          )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Created items table.");

            // Clear the existing data in the products table
            db.run(`DELETE FROM items`, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("All rows deleted from items");

                // Insert new data into the products table
                const values1 = [
                    "Murat",
                    "111111111111111111111111111111111",
                    "2222222222222222",
                ];
                const values2 = [
                    "Keskin",
                    "33333333333333333333333333333333333",
                    "44444444444444444444444444444444444",
                ];

                const values3 = [
                    "Tetian",
                    "555555555555555555555555555",
                    "666666666666666666666666666",
                ];

                const values4 = [
                    "Barls",
                    "777777777777777777777777777",
                    "8888888888888888888888888888",
                ];

                const insertSql = `INSERT INTO users(UserName, Walletid, Address) VALUES(?, ?, ?)`;

                db.run(insertSql, values1, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values2, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values3, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                db.run(insertSql, values4, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    const id = this.lastID; // get the id of the last inserted row
                    console.log(`Rows inserted, ID ${id}`);
                });

                //   Close the database connection after all insertions are done
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Closed the database connection.");
                });
            });
        }
    );
});