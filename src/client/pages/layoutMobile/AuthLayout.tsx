// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div id="login" className="flex h-[100vh]  items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
