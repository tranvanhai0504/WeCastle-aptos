import { useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";

import { MODULE_ADDRESS } from "../../utils/Var";
import { useAlert } from "../../contexts/AlertProvider";
import useContract from "../../hooks/useContract";
import CustomButton from "../buttons/CustomButton";
import CustomInput from "../input/CustomInput";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import AuthContext from "../../contexts/AuthProvider";

const CreateAccount = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { callContract } = useContract();
  const { setAlert } = useAlert();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return;

    // if (!auth.keylessWalletAddress) window.location.href = "/auth/login";
  }, [auth]);

  const handleSubmit = async () => {
    if (!(username && name)) {
      setAlert("All fields must be filled.", "info");
      return;
    }

    setLoading(true);
    await callContract({
      functionName: "create_account",
      functionArgs: [name],
      onSuccess(result) {
        window.location.href = "/";
        setAlert("Create account successfully!", "success");
      },
      onError(error) {
        if (error.status === 404)
          setAlert("You need to faucet your account!", "info");
        else
          setAlert(
            "Username is already taken. Please choose another one.",
            "info"
          );
        console.error("Error calling smart contract:", error);
      },
      onFinally() {
        setLoading(false);
      },
    });
  };

  return (
    <Modal open={true}>
      <Box
        sx={{
          width: "75vw",
          background: "#222222",
          padding: 3,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "1rem",
        }}
      >
        <div className="vt323-regular flex w-full flex-col items-center space-y-4">
          <h1 className="text-2xl text-white">Create your account</h1>

          <CustomInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            disabled={false}
          />
          <CustomInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            disabled={false}
          />
          <CustomButton
            content={loading ? "Loading..." : "Create"}
            onClick={handleSubmit}
            disabled={loading}
          />
          <p className="text-white">OR</p>
          <CustomButton
            content={"Change Account"}
            onClick={async () => {
              await auth?.logout();
            }}
            disabled={false}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAccount;
