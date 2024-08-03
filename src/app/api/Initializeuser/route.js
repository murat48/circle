"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const Initializeuser = async (userToken) => {
    const idempotencyKey = uuidv4(); // generates an idempotency key

    const options = {
        method: "POST",
        url: "https://api.circle.com/v1/w3s/user/initialize",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${process.env.NEXT_PUBLIC_API_KEY}`,
            "X-User-Token": userToken,
        },
        data: {
            idempotencyKey: idempotencyKey, accountType: "SCA",
            blockchains: ["MATIC-AMOY"]
        },
    };

    return axios
        .request(options)
        .then(function (response) {
            console.log("idempotency key: ", idempotencyKey);
            return response.data.data.challengeId;
        })
        .catch(function (error) {
            console.error(error);
        });
};