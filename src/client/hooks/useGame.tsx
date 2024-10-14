import React, { useState } from "react";
import useContract from "./useContract";

const MAX_ROUND = 3;

const useGame = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const { callContract, callAdminContract } = useContract();

  const playRound = async (round: number): Promise<boolean> => {
    if (round < 0 || round > MAX_ROUND) return false;

    try {
      setLoadingFetch(true);

      await callContract({
        functionName: `play_round${round}`,
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
      console.error("Error play round 1 call:", error);
      return false;
    }
    return true;
  };

  const endGame = async (
    round: number,
    address: string,
    point: number
  ): Promise<boolean> => {
    if (round < 0 || round > MAX_ROUND) return false;

    try {
      setLoadingFetch(true);

      await callAdminContract({
        functionName: `add_certificate_round${round}`,
        functionArgs: [address, point],
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
      console.error("Error play round 1 call:", error);
      return false;
    }
    return true;
  };

  return { playRound, endGame };
};

export default useGame;
