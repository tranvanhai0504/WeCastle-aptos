import { useEffect, useState, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import AuthContext from "../../contexts/AuthProvider";
import { getLocalKeylessAccount } from "../../keyless";

const RequireAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const auth = useContext(AuthContext);

  const keylessAccount = getLocalKeylessAccount();

  useEffect(() => {
    if (!keylessAccount || keylessAccount.ephemeralKeyPair.isExpired()) {
      window.location.href = "/auth/login";
    }
  }, [keylessAccount]);

  useEffect(() => {
    if (auth?.keylessWalletAddress !== "") {
      UpdateAccount(auth?.keylessWalletAddress);
    }
  }, [auth?.keylessWalletAddress]);

  const UpdateAccount = async (address: string | undefined) => {
    if (address) {
      try {
        if (!auth) return;

        const result = await auth.fetchPlayerInfo(address);

        if (!result) navigate("/create-account");
        await auth.fetchCreditInfor(address);
      } catch (error) {
        navigate("/create-account");
      }
    }
  };

  const ProgressBar = () => (
    <div className="border-dark-300 w-[350px] border-2">
      <div className="m-1">
        <div
          style={{
            border: "1px solid black",
            width: `${progress}%`,
            height: "30px",
            backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );

  // if (connecting && !connected) {
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center">
  //       <div className="m-2 text-xl text-white">Loading...</div>
  //       <ProgressBar />
  //     </div>
  //   );
  // }

  return <Outlet />;
};

export default RequireAuth;
