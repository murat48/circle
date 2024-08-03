import dotenv from "dotenv";


import fetch from "node-fetch";

dotenv.config();

const url = `https://api.circle.com/v1/w3s/wallets/${process.env.NEXT_PUBLIC_WALLET_ID}/balances`;

const options = {

    method: "GET",

    headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,

    },

};

// fetch(url, options)

//     .then((res) => gt, res.json())

//     .then((json) => gt, console.dir(json, { depth: null }))

//     .catch((err) => gt, console.error("error:" + err));