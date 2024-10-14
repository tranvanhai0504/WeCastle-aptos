import React, { useEffect } from "react";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import "../../App.css";
import { EphemeralKeyPair } from "@aptos-labs/ts-sdk";
import { storeEphemeralKeyPair } from "../../ephemeral";
import { getLocalKeylessAccount } from "../../keyless";

export const LoginPage = () => {
  const navigate = useNavigate();
  const keylessAccount = getLocalKeylessAccount();

  useEffect(() => {
    if (keylessAccount && !keylessAccount?.ephemeralKeyPair.isExpired()) {
      navigate("/");
    }
  }, [keylessAccount]);

  // When a user visits, we check to see if there is an existing, valid KeylessAccount from a previous visit

  // 1. Create and store a new ephemeral keypair
  // 2. Redirect the user to Google's OAuth login flow. The user will then be redirected back
  //     to the '/googlecallback' page where we'll parse the JWT and create a KeylessAccount
  //     to sign their transactions.
  const logInWithGoogle = async () => {
    const ephemeralKeyPair = EphemeralKeyPair.generate();
    console.log("Storing a new ephemeral keypair for the user.");
    storeEphemeralKeyPair(ephemeralKeyPair);

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!GOOGLE_CLIENT_ID) {
      throw Error("GOOGLE_CLIENT_ID .env.local variable not set");
    }
    const NONCE = ephemeralKeyPair.nonce;
    const REDIRECT_URI = "http://localhost:3000/googlecallback";
    const LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&scope=openid+email+profile&nonce=${NONCE}&redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`;
    window.location.href = LOGIN_URL;
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-72">
        <img src="/banner.png" className="w-2/3" />
        <button
          className="mt-10 inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
          onClick={logInWithGoogle}
        >
          <FcGoogle />
          <span className="ml-1">Sign in</span>
        </button>
      </div>
    </>
  );
};
