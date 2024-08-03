import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;


// Define the GET request handler function
export async function POST(req, res) {
    const body = await req.json();
    const { UserName, walletid, walletadress } = body;
    // const body = await req.json();
    // const { UserName, walletid, walletadress2 } = body;

    // Check if the database instance has been initialized
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: "./collection.db", // Specify the database file path
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }
    const values4 = [
        UserName,
        walletid,
        walletadress,
    ];
    const insertSql = `INSERT INTO users(UserName, Walletid, Address) VALUES(?, ?, ?)`;

    db.run(insertSql, values4, function (err) {
        if (err) {
            return console.error(err.message);
        }
        // const id = this.lastID; // get the id of the last inserted row
        console.log(`Rows inserted`);
    });
    // Perform a database query to retrieve all items from the "items" table
    // const items = await db.all("SELECT * FROM users");

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });

}

// const express = require('express');
// const bodyParser = require('body-parser');


// const express = require('express');
// const app = express();



// app.post('/api/adduser', (req, res) => {
//     const { UserName, walletid, walletadress2 } = req.body;
//     console.log(`Received user: ${UserName}, age: ${walletid} ,ages: ${walletadress2}`);
//     if (!db) {
//         // If the database instance is not initialized, open the database connection
//         db = open({
//             filename: "./collection.db", // Specify the database file path
//             driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
//         });
//     }
//     const values4 = [
//         UserName,
//         walletid,
//         walletadress2,
//     ];

//     const insertSql = `INSERT INTO users(UserName, Walletid, Address) VALUES(?, ?, ?)`;

//     db.run(insertSql, values4, function (err) {
//         if (err) {
//             return console.error(err.message);
//         }
//         // const id = this.lastID; // get the id of the last inserted row
//         console.log(`Rows inserted`);
//     });
//     // Örnek bir cevap döndürme
//     res.json({ message: `Hello, ${UserName}` });
// });



// const app = express();
// const port = 3000;

// // Let's initialize it as null initially, and we will assign the actual database instance later.
// let db = null;
// app.use(bodyParser.json());

// app.get('/api/adduser', (req, res) => {
//     const { UserName, walletid, walletadress2 } = req.body;
//     console.log(`Received user: ${UserName}, age: ${walletid} ,age: ${walletadress2}`);
//     alert(UserName);
//     // Veritabanına ekleme işlemi burada yapılır
//     res.status(201).json({ message: 'User created successfully!' });
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
// Define the GET request handler function
// export async function GET(req, res) {
//     // Extract the "id" from the URL by splitting the URL and taking the last element
//     // const id = req.url.split("/").pop();
//     const { UserNames, Walletsid, Walletadres } = req.body;
//     console.log(`Received user: ${UserNames}, age: ${Walletsid} ,ages: ${Walletadres}`);
//     // Log the extracted "id" to the console (for debugging purposes)
//     // console.log(id);

//     // Check if the database instance has been initialized
//     if (!db) {
//         // If the database instance is not initialized, open the database connection
//         db = await open({
//             filename: "./collection.db", // Specify the database file path
//             driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
//         });
//     }
//     const values4 = [
//         UserNames,
//         Walletsid,
//         Walletadres,
//     ];

//     const insertSql = `INSERT INTO users(UserName, Walletid, Address) VALUES(?, ?, ?)`;

//     db.run(insertSql, values4, function (err) {
//         if (err) {
//             return console.error(err.message);
//         }
//         // const id = this.lastID; // get the id of the last inserted row
//         console.log(`Rows inserted`);
//     });
//     // Perform a database query to retrieve an item based on the id
//     const item = await db.get("SELECT * FROM users");

//     // Return the items as a JSON response with status 200
//     return new Response(JSON.stringify(item), {
//         headers: { "Content-Type": "application/json" },
//         status: 200,
//     });
// }