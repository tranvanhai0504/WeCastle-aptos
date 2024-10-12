import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import React, { useState } from "react";
import { MODULE_ADDRESS } from "../utils/Var";
import useContract from "./useContract";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useCredit = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const { callContract } = useContract();
  const fetchCredit = async (address: string): Promise<number | null> => {
    try {
      setLoadingFetch(true);

      const aptosConfig = new AptosConfig({
        network: Network.TESTNET,
      });
      const aptos = new Aptos(aptosConfig);

      const payload: InputViewFunctionData = {
        function: `${MODULE_ADDRESS}::gamev1::get_player_credit`,
        functionArguments: [address],
      };

      const response = await aptos.view({ payload });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const CreditData: number = response[0].vec[0] | 0;
      // Handle the response (e.g., set user data)
      return CreditData;
    } catch (error) {
      setLoadingFetch(false);
      console.error("Error fetching player info:", error);
    }
    return null;
  };

  const claimCredit = async (): Promise<boolean | null> => {
    try {
      setLoadingFetch(true);

      await callContract({
        functionName: "claim_credit",
        functionArgs: [],
        onSuccess(result) {
          return true;
        },
        onError(error) {
          if (error.status === 404) return false;
          else return false;
        },
        onFinally() {
          setLoadingFetch(false);
        },
      });
    } catch (error) {
      setLoadingFetch(false);
      console.error("Error fetching player info:", error);
    }
    return null;
  };

  return { fetchCredit, loadingFetch, claimCredit };
};

export default useCredit;
