import axios from "axios";

export const RetrieveuserCredentials = async (userId) => {

    const options = {
        method: "POST",
        url: "https://api.circle.com/v1/w3s/users/token",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        data: { userId: userId },
    };

    return axios
        .request(options)
        .then(function (response) {
            console.log("user token:", response.data.data.userToken);
            console.log("encryption key:", response.data.data.encryptionKey);
            return {
                userToken: response.data.data.userToken,
                encryptionKey: response.data.data.encryptionKey,
            };
        })
        .catch(function (error) {
            console.error(error);
        });

};
