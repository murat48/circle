"use server";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
  const idempotencyKey = uuidv4(); // generates an idempotency key

  try {
    const options = {
      method: "POST",
      url: "https://api.circle.com/v1/w3s/user/initialize",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        "X-User-Token": `${process.env.REACT_APP_CIRCLE_USER_TOKEN}`,
      },
      data: {
        idempotencyKey: idempotencyKey,
        accountType: "EOA",
        blockchains: ["MATIC-AMOY"],
      },
    };

    const response = await axios.request(options);
    console.log("response:", response);

    return response.data.data.challengeId;
  } catch (error) {
    console.error(error);
  }
};
