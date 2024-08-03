"use client";
import { useState, React } from "react";
import axios from "axios";
import { transfer } from "../api/transfer";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"; import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"; import Link from "next/link";

export default function WalletOps() {
    const [wallet, setWallet] = useState();
    const [balance, setBalance] = useState();
    const getUserWallet = async () => {
        try {
            const options = {
                method: "GET",
                url: `https://api.circle.com/v1/w3s/wallets?userId=${process.env.NEXT_PUBLIC_USER_ID}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            };
            const response = await axios.request(options);
            console.log(response);
            setWallet(response?.data?.data?.wallets[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const getBalance = async () => {
        try {
            const options = {
                method: "GET",
                url: `https://api.circle.com/v1/w3s/wallets/${process.env.NEXT_PUBLIC_WALLET_ID}/balances`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            };

            const response = await axios.request(options);
            console.log(response);
            setBalance(response.data.data.tokenBalances[1]?.amount || 0);
        } catch (error) {
            console.error(error);
        }
    };
    const transferToken = async () => {
        try {
            const result = await transfer();
            console.log(result);
        } catch (error) {
            console.log(error);
        };
    }
    return (
        <Container>
            <Box
                sx={{ backgroundColor: "#8e44ad" }}
                borderRadius={3}
                padding={1}
                textAlign="center"
                marginTop={3}
            >
                <Typography variant="h5">User Controlled Wallet</Typography>
            </Box>
            <Stack direction="column" alignItems="left" paddingTop={3} gap={2}>
                <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={getUserWallet}
                >
                    Get Wallet
                </Button>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Wallet Id: {wallet?.id}</Typography>

                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Create Date: {wallet?.createDate}</Typography>

                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Blockchain: {wallet?.blockchain}</Typography>

                </Stack>

                <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={getBalance}
                >
                    Get Balance
                </Button>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>Balance:{balance}</Typography>

                </Stack>

                <Button
                    variant="contained"
                    onClick={transferToken}
                >
                    Transfer
                </Button>
                <Link
                    href="/sendcoin"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 before:absolute before:h-[300px] before:w-[280px] before:-translate-x-1/3 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:translate-x-2/3 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-600 after:dark:opacity-60 before:lg:h-[180px]"
                >
                    <p>Send Coin</p>
                </Link>
                <Box
                    sx={{ backgroundColor: "#8e44ad" }}
                    borderRadius={3}
                    padding={1}
                    textAlign="center"
                    marginTop={3}
                >
                    <Link href="/">
                        <h2>
                            Go to home page<span>-&gt;</span>
                        </h2>
                    </Link>
                </Box>
            </Stack>
        </Container>


    );
}