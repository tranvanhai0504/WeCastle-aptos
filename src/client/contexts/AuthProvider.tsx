import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerInfo } from "../types/type";
import useGetPlayer from "../hooks/useGetPlayer";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useCredit from "../hooks/useCredit";
import { deleteKeylessAccount, getLocalKeylessAccount } from "../keyless";
import { deleteEphemeralKeyPair } from "../ephemeral";
import { useAlert } from "./AlertProvider";

// Define an interface for the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  player: PlayerInfo;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  fetchPlayerInfo: (address: string) => Promise<boolean>;
  fetchCreditInfor: (address: string) => Promise<void>;
  CreditInfor: number;
  isSuccessFetchPlayer: boolean;
  keylessWalletAddress: string;
  logout: () => Promise<void>;
  setLatestHash: React.Dispatch<React.SetStateAction<string>>;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [keylessWalletAddress, setkeylessWalletAddress] = useState<string>("");
  const [latestHash, setLatestHash] = useState("");
  const { fetchPlayer } = useGetPlayer();
  const { fetchCredit } = useCredit();
  const { setAlert } = useAlert();

  const keylessAccount = getLocalKeylessAccount();

  useEffect(() => {
    if (keylessAccount && !keylessAccount.ephemeralKeyPair.isExpired()) {
      setkeylessWalletAddress(keylessAccount.accountAddress.toString());
    }
  }, [keylessAccount]);

  useEffect(() => {
    if (latestHash !== "") {
      const alertContent = (
        <>
          Ready Transaction:{" "}
          <a
            href={`https://explorer.aptoslabs.com/txn/${latestHash}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {latestHash}
          </a>
        </>
      );
      setAlert(alertContent, "success");
    }
  }, [latestHash]);

  const [isSuccessFetchPlayer, setIsSuccessFetchPlayer] = useState(false);
  const [CreditInfor, setCreditInfor] = useState<number>(0);
  const [player, setPlayer] = useState<PlayerInfo>({
    address_id: "",
    current_round: 0,
    game_finished: true,
    hero_owned: "",
    name: "",
    last_claim_time: "",
    round1_finish_time: "",
    round1_play_time: "",
    round2_finish_time: "",
    round2_play_time: "",
    round3_finish_time: "",
    round3_play_time: "",
  });

  const fetchPlayerInfo = async (address: string) => {
    const player = await fetchPlayer(address);

    if (player) {
      setPlayer(player);
      setIsSuccessFetchPlayer(true);
      return true;
    }

    setIsSuccessFetchPlayer(false);
    return false;
  };

  const fetchCreditInfor = async (address: string) => {
    const credit = await fetchCredit(address);

    if (credit) {
      setCreditInfor(credit);
    }
  };

  const logout = async (): Promise<void> => {
    console.log(
      "Deleting the KeylessAccount and ephemeral keypair from local storage and returning the user to the homepage."
    );
    deleteKeylessAccount();
    deleteEphemeralKeyPair();
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{
        player,
        setPlayer,
        fetchPlayerInfo,
        fetchCreditInfor,
        CreditInfor,
        isSuccessFetchPlayer,
        keylessWalletAddress,
        logout,
        setLatestHash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
