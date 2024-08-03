"use client";
import { useCallback, useState, useEffect, React } from "react";
import { Initializeuser } from "../api/Initializeuser/route";
import { Getappid } from "../api/Getappid/route";
import { RetrieveuserCredentials } from "../api/AcquireSessiontoken/route";
import { CreateNewUser } from "../api/CreateNewUser/route";
import SubmitButton from "../components/submitButton";

import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";


let sdk;


export const CreateUser = () => {


    useEffect(() => {
        sdk = new W3SSdk();
    }, []);
    useEffect(() => {
        retrieve_app_id();
    }, []);

    const [userId, setUserId] = useState("the user id will appear here");
    const [appId, setAppId] = useState("the user id will appear here");
    const [challengeId, setChallengeId] = useState(
        "the challenge id will appear here"
    );
    const [userToken, setUserToken] = useState("user token will appear here");
    const [encryptionKey, setEncryptionKey] = useState(
        "encryption key will appear here"
    );
    const handleClick = () => {
        if (buttonRef.current && !buttonRef.current.disabled) {
            buttonRef.current.disabled = true;

            // Perform the action
            // After the action is complete, reset buttonRef.current.disabled to false
        }
    };
    useEffect(() => {
        onSubmit();
    }, [appId, userToken, encryptionKey, challengeId]);
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



        // sdk.setAppSettings({ appid });
        // sdk.setAuthentication({ userToken, encryptionKey });

        // sdk.execute(challengeId, (error, result) => {
        //     if (error) {
        //         toast.error(`Error: ${error?.message ?? "Error!"}`);
        //         return;
        //     }
        //     toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
        // });

        // setButtonClicked(true);
    }; const onChangeHandler = useCallback(
        (setState, key) => (e) => {
            const value = e.target.value;
            setState(value);
            localStorage.setItem(key, value);
        },
        []
    );

    const onSubmit = useCallback(() => {
        sdk.setAppSettings({ appId });
        sdk.setAuthentication({ userToken, encryptionKey });

        sdk.execute(challengeId, (error, result) => {
            if (error) {
                toast.error(`Error: ${error?.message ?? "Error!"}`);
                return;
            }
            toast.success(`Challenge: ${result?.type}, Status: ${result?.status}`);
        });
    }, [appId, userToken, encryptionKey, challengeId]);

    const handleButtonClickWrapper = () => {
        // Diğer işlemler yapılabilir


        // useCallback işlevini çağırıyoruz
        onSubmit();
    };
    // co
    // const create_user = async () => {
    //     const response = await CreateNewUser();


    //     setUserId(response.userId);
    //     // setStatus(response.status);
    //     // setButtonClicked(true);
    // };




    // const Retrieveusercredentials = async () => {
    //     const response = await RetrieveuserCredentials(userId);
    //     setUserToken(response.userToken);
    //     setEncryptionKey(response.encryptionKey);

    // };




    // const initialize = async () => {
    //     const response = await Initializeuser(userToken);
    //     console.log(response);
    //     setChallengeId(response);

    // };

    return (
        <>

            {/* <SubmitButton
                button_text="Get Init"
                button_function={initialize} />
            <SubmitButton
                button_text="Get cret"
                button_function={Retrieveusercredentials} /> */}

            {/* <SubmitButton button_text="Greate User" button_function={create_user} /> */}
            <div>         <SubmitButton
                button_text="Get App ID"
                button_function={retrieve_app_id} />
                <p id="test3">{userId}</p> <p id="test4">{appId}</p>
                <p id="test5" >{challengeId}</p>
                <p id="test6">{encryptionKey}</p>

            </div>
            <div>

                <Button variant="contained" color="success" onClick={onSubmit}>
                    Verify Challeng
                </Button>


            </div>
            <p id="test7" >{userToken}</p>
        </>

    )
}





