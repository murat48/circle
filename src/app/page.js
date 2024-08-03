'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
// import { CreateUser } from './components/CreateUser';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';

import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import Link from "next/link"; import Image from "next/image";
import './App.css';
import { Button } from '@mui/material';
import CreateWalletForm from './components/createWalletForm';
import { useRouter } from 'next/navigation'
import Grid from "@mui/material/Unstable_Grid2";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { transfer } from "./api/transfer";
let sdk;



function App() {

  const router = useRouter();
  const [items, setItems] = useState([]);
  const [chalid, setChallengeid] = useState([]);
  const transferToken = async () => {
    try {
      const result = await transfer();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreatWallet = async () => {

    console.log(sdk);
    const challengeId = process.env.NEXT_PUBLIC_CHALLENGE_ID || "";

    sdk.setAppSettings({
      appId: process.env.NEXT_PUBLIC_APP_ID || "",
    });

    console.log(sdk);
    console.log("set the app settings");
    sdk.setAuthentication({
      userToken: process.env.NEXT_PUBLIC_USER_TOKEN || "",
      encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "",
    });
    console.log("set the authentication");
    try {
      sdk.execute(challengeId, (error, result) => {
        console.log("INSIDE THE EXECUTE METHOD");
        if (error) {
          console.log(
            `${error?.code?.toString() || "Unknown code"}: ${error?.message ?? "Error!"
            }`
          );

          return;
        }

        console.log(`Challenge: ${result?.type}`);
        console.log(`status: ${result?.status}`);
      });



    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sdk = new W3SSdk();
    transferToken();
  }, []);

  // Use the useEffect hook to fetch data from the API endpoint when the component mounts

  // Use the useEffect hook to fetch data from the API endpoint when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    }).then((res) => res.json()) // Parse the response data as JSON
      .then((data) => setItems(data)); // Update the state with the fetched data
  }, []);
  const collection = items.map((item) => {

    return (

      // Use the Material-UI Grid component to display each item in a grid layout
      <Grid key={item.id} id={item.id} xs={3}>
        {/* Use the Next.js Image component to display the item image */}
        <Image src={item.img} alt="pokemon card" width={245} height={342} />
        {/* Display the item name and description */}
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </Grid>
    );
  });
  return (
    <GlobalProvider>
      <Header />
      {/* 
      <Balance />
      <IncomeExpenses /> */}
      {/* <TransactionList /> */}
      <AddTransaction />


      <Link
        href="/create_wallet"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 before:absolute before:h-[300px] before:w-[280px] before:-translate-x-1/3 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:translate-x-2/3 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-600 after:dark:opacity-60 before:lg:h-[180px]"
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.5rem_#ffffff90] dark:invert"
          src="/white_wallet_logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />  Create Wallet
      </Link>
      <Button
        type="submit"
        onClick={handleCreatWallet}
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        Send Coin
      </Button><br></br>
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={transferToken}
      >
        Transfer
      </Button>
    </GlobalProvider >
  );
}

export default App;
