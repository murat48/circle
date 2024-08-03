"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Initializeuser } from "../api/Initializeuser/route";
import { Getappid } from "../api/Getappid/route";
import { RetrieveuserCredentials } from "../api/AcquireSessiontoken/route";
import { CreateNewUser } from "../api/CreateNewUser/route";
import Button from "@mui/material/Button";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import SubmitButton from "../components/submitButton"; import TextField from "@mui/material/TextField";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";

let sdk;


function CreateWalletForm() {
  const usid = uuidv4();



  // Connect to SQLite database, and if it doesn't exist, create it

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter()
  // const handleCreatWallet = async () => {

  //   console.log(sdk);
  //   const challengeId = process.env.NEXT_PUBLIC_CHALLENGE_ID || "";

  //   sdk.setAppSettings({
  //     appId: process.env.NEXT_PUBLIC_APP_ID || "",
  //   });

  //   console.log(sdk);
  //   console.log("set the app settings");
  //   sdk.setAuthentication({
  //     userToken: process.env.NEXT_PUBLIC_USER_TOKEN || "",
  //     encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "",
  //   });
  //   console.log("set the authentication");
  //   try {
  //     sdk.execute(challengeId, (error, result) => {
  //       console.log("INSIDE THE EXECUTE METHOD");
  //       if (error) {
  //         console.log(
  //           `${error?.code?.toString() || "Unknown code"}: ${error?.message ?? "Error!"
  //           }`
  //         );

  //         return;
  //       }

  //       console.log(`Challenge: ${result?.type}`);
  //       console.log(`status: ${result?.status}`);
  //     });



  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    sdk = new W3SSdk();
  }, []);
  useEffect(() => {
    // router.push({
    //   pathname: '/',
    //   query: { name: 'Someone' }
    // });

    retrieve_app_id();
    // setstate("İşlem Başarılı");
    // router.push('/')
    // 


  }, []);


  const [userId, setUserId] = useState("the user id will appear here");
  const [appId, setAppId] = useState("the user id will appear here");
  const [challengeId, setChallengeId] = useState(
    "the challenge id will appear here"
  );
  const [state, setstate] = useState('');
  const [userToken, setUserToken] = useState("user token will appear here");
  const [encryptionKey, setEncryptionKey] = useState(
    "encryption key will appear here"
  );
  const [wallet, setWallet] = useState();
  const [walletadress, setWalletadress] = useState();
  const [balance, setBalance] = useState();
  const [walletid, setWalletid] = useState();
  const [walletadress2, setWalletadress2] = useState();
  const [UserName, setUserName] = useState();



  const retrieve_app_id = async () => {

    const response = await Getappid();
    console.log("your app id: " + response);
    setAppId(response);
    const response1 = await CreateNewUser();


    setUserId(response1.userId);

    const response3 = await RetrieveuserCredentials(response1.userId);
    setUserToken(response3.userToken);
    setEncryptionKey(response3.encryptionKey);
    const response4 = await Initializeuser(response3.userToken);
    console.log(response4);
    setChallengeId(response4);

    // if (status == false) {

    //   setstatus(true);
    // }

  };

  useEffect(() => {
    onSubmit();
  }, [appId, userToken, encryptionKey, challengeId]);

  useEffect(() => {
    getUserWallet()

  }, [userId]);


  const getUserWallet = async () => {
    try {
      const options = {
        method: "GET",
        url: `https://api.circle.com/v1/w3s/wallets?userId=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };
      const response = await axios.request(options);
      console.log(response);

      setWallet(response?.data?.data?.wallets[0]);
      alert(wallet.address);
      alert(wallet.id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setWallet(event.target.value);
    console.log('Input value:', event.target.value);
  };
  // const getUserWalletAddress2 = async () => {
  //   const axios = require('axios');

  //   const options = {
  //     method: 'GET',
  //     url: `https://api.circle.com/v1/w3s/wallets/${wallet?.id}`,
  //     headers: {
  //       accept: 'application/json',
  //       'X-User-Token': userToken,
  //       authorization: 'Bearer TEST_API_KEY:951118525fe74c74d28c8e4ac20a4459:8bc450f8d1bf979205f00c8a93291e3c'
  //     }
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       alert(wallet.address);
  //       setWalletadress(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       alert(wallet.address);
  //       console.error(error);
  //     })
  // };


  // const getUserWalletAddress = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       url: `https://api.circle.com/v1/w3s/wallets/e5137b1c-0f72-54cf-a2cc-020feb4ba5c5`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-User-Token": `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoTW9kZSI6IlBJTiIsImRldmVsb3BlckVudGl0eUVudmlyb25tZW50IjoiVEVTVCIsImVudGl0eUlkIjoiMjMzYWY1YmQtZTIxMy00NWFkLWJmNzktNDliOTUxYmVhODM4IiwiZXhwIjoxNzIyNTQ1NDAxLCJpYXQiOjE3MjI1NDE4MDEsImludGVybmFsVXNlcklkIjoiM2YzZmMwZDAtNWIyMi01NDU0LTg4OTUtZDlkMzU3ZWRkOTRhIiwiaXNzIjoiaHR0cHM6Ly9wcm9ncmFtbWFibGUtd2FsbGV0LmNpcmNsZS5jb20iLCJqdGkiOiI0YjJiNzQ0OC0wZjVjLTRiOGMtOGI4Zi0xYjI2NTc0ZDBiN2EiLCJzdWIiOiI4MjBiYWE2Mi03MWIxLTQ0NzEtYjI2NS03Y2U5OGQwOGQ5OWUifQ.bQvx20rB8YEKCU43NDoqD0P03d-c-qLkMNsv4KT6ZMhQIYI7XeY1kbxRc8UIulCKmGr5RpNtLQJqcV6SMTMTYRubxneti-3uM0dfxpmeoznf5F6wsPjXMT7UpV3g8eS56TBUZpU_CO1tDKlsGjxyz76x6F3d6yDZo2leGHnwT6u4PKhhK9aLLJycZiu9hCZtvOBSjZqmw8BV2JuH9YKxakrJnbjtKiWG5woQ-5JtT1oXPEE7p6QXnUp24w-JQo2J2_WG5xPLKIGLaleR8exCE8Jt2Ov-zvn1Wm1j524iUxQngMwVuE3WvsdGu_rLKz7EidMZLFRdZnnrFGqLd4AWMw`,

  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  //       },
  //     };
  //     const response = await axios.request(options);
  //     // console.log(response);
  //     // console.log(response.data);
  //     // alert(response.data);
  //     // setWalletadress(response.data);
  //     // setWallet(response?.data?.data?.wallets[0]);
  //   } catch (error) {
  //     alert(error);
  //     console.error(error);
  //   }
  // };
  // const axios = require('axios');

  // const getUserWalletAddress = async () => {

  //   const options = {
  //     method: 'GET',
  //     url: `https://api.circle.com/v1/w3s/wallets/${wallet?.id}`,
  //     headers: {
  //       accept: 'application/json',
  //       'X-User-Token': `${userToken}`,
  //       authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  //     }
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);

  //       setWalletadress(response.data);
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //       console.error(error);
  //     });
  // };

  const onChangeHandler = useCallback(
    (setState, key) => (e) => {
      const value = e.target.value;
      setState(value);
      localStorage.setItem(key, value);
    },
    []
  );

  const buttonRef = useRef(null);



  const handleClick = async () => {
    alert('İşlem Başarılı')
    getUserWallet();

  };
  const handleSubmit2 = async () => {

    setWalletid(wallet?.id);
    setWalletadress(wallet?.address)
    setUserName(usid);
    // const userData = { UserName, walletid, walletadress };

    try {
      const response = axios.post('http://localhost:3000/api/adduser', { UserName, walletid, walletadress });
      router.push('/')
      // alert(UserName);
      // const response = await axios.post('http://localhost:3000/api/users', { name, age });

      // alert(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
    //  axios.post('http://localhost:3000/api/adduser', {
    //   UserName: UserName,
    //   walletid: walletid,
    //   walletadress: walletadress
    // })
    //   .then(response => {
    //     setData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
    // axios.get('http://localhost:3000/api/adduser', userData)
    //   .then(response => {
    //     console.log('Success:', response.data);
    //     alert("Basarili");
    //     // Başarılı veri gönderiminden sonra yapılacak işlemler
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     alert(error);
    //     // Hata durumunda yapılacak işlemler
    //   });
  };
  const handleSubmit = async () => {

    setWalletid(wallet?.id);
    setWalletadress(wallet?.address)
    setUserName("Murat23");
    // const userData = { UserName, walletid, walletadress };

    try {
      const response = await axios.post('http://localhost:3000/api/adduser', { UserName, walletid, walletadress });

      // alert(UserName);
      // const response = await axios.post('http://localhost:3000/api/users', { name, age });
      console.log('User added:', response.data);
      // alert(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
    //  axios.post('http://localhost:3000/api/adduser', {
    //   UserName: UserName,
    //   walletid: walletid,
    //   walletadress: walletadress
    // })
    //   .then(response => {
    //     setData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
    // axios.get('http://localhost:3000/api/adduser', userData)
    //   .then(response => {
    //     console.log('Success:', response.data);
    //     alert("Basarili");
    //     // Başarılı veri gönderiminden sonra yapılacak işlemler
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     alert(error);
    //     // Hata durumunda yapılacak işlemler
    //   });
  };
  const onSubmit = useCallback(() => {


    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        // toast.error(`Error: ${error?.message ?? "Error!"}`);
        return;
      }
      else {
        if (buttonRef.current) {
          buttonRef.current.click(); handleSubmit()
        }

        getUserWallet()
        handleSubmit();


        // getUserWalletAddress()
        //router.push('/')
      }
      // toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
    });
  }, [appId, userToken, encryptionKey, challengeId]);


  useEffect(() => {
    handleSubmit()

  }, [usid, walletid, walletadress]);

  return (
    <div className="p-4 bg-white mx-12 rounded">
      <div className="grid grid-cols-5">

        {/* <SubmitButton
          button_text="Get App ID"
          button_function={retrieve_app_id} /> */}
        <Button variant="contained"
          sx={{ textTransform: "none" }} onClick={handleSubmit2}>
          Para Transferi Yap
        </Button>

        {/* <div> */}
        <div style={{ display: 'none' }} >


          <p id="test3">{userId}</p> <p id="test4">{appId}</p>
          <p id="test5" >{challengeId}</p>
          <p id="test6">{encryptionKey}</p>
          <p id="test8">wallet id: {wallet?.id}</p>
          <p id="test7">{userToken}</p>
          {/* <div>
            <input
              type="text"
              value={wallet?.address}
              onChange={handleChange}
              placeholder="Type something..."
            />
            <p>You typed: {wallet?.address}</p>
          </div> */}
          <p id="test9">'Adress:{wallet?.address}</p>
        </div>
        {/* <div>
          <TextField
            label="App Id"
            onChange={onChangeHandler(setAppId, "appId")}
            value={appId}
          />
        </div>
        <div>
          <TextField
            label="User Token"
            onChange={onChangeHandler(setUserToken, "userToken")}
            value={userToken}
          />
        </div>
        <div>
          <TextField
            label="Encryption Key"
            onChange={onChangeHandler(setEncryptionKey, "encryptionKey")}
            value={encryptionKey}
          />
        </div>
        <div>
          <TextField
            label="Challenge Id"
            onChange={onChangeHandler(setChallengeId, "challengeId")}
            value={challengeId}
          />
        </div> */}
        {/* <p>Blockchain: {userToken}</p> */}
        <div style={{ display: 'none' }} className="flex items-center justify-center">
          {/* <Button variant="contained" color="success" onClick={onSubmit}>
            Verify Challenge
          </Button> */}
          {/* <Button variant="contained" color="success" onClick={getUserWallet}>
            get wallet user
          </Button>
          <Button variant="contained" color="success" onClick={getUserWalletAddress2}>
            Verify Challenge
          </Button> */}
          {/* <Button variant="contained" color="success" onClick={getUserWalletAddress2}>
            Verify Challenge
          </Button> */}
          <Button onClick={handleSubmit}>
            handleSubmit
          </Button>

          <Button ref={buttonRef} onClick={handleClick}>
            get wallet user
          </Button>

          {/* <p>Wallet Id: {wallet?.id}</p> <p>Wallet adr: {walletadress?.address}</p> */}
          {/* <p>Wallet adres: {walletadress}</p> */}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div >
  );
}

export default CreateWalletForm;
