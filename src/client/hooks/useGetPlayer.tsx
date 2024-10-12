import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import React, { useState } from "react";
import { MODULE_ADDRESS } from "../utils/Var";
import { LeaderBoardInfo, PlayerInfo } from "../types/type";

const useGetPlayer = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchPlayer = async (address: string): Promise<PlayerInfo | null> => {
    try {
      setLoadingFetch(true);

      const aptosConfig = new AptosConfig({
        network: Network.TESTNET,
      });
      const aptos = new Aptos(aptosConfig);

      const payload: InputViewFunctionData = {
        function: `${MODULE_ADDRESS}::gamev1::get_player_info`,
        functionArguments: [address],
      };

      const response = await aptos.view({ payload });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const playerData: PlayerInfo = response[0];
      // Handle the response (e.g., set user data)
      return playerData;
    } catch (error) {
      setLoadingFetch(false);
      console.error("Error fetching player info:", error);
    }
    return null;
  };

  const fetchLeaderBoard = async (
    top10: number,
  ): Promise<LeaderBoardInfo[] | null> => {
    try {
      setLoadingFetch(true);
      const aptosConfig = new AptosConfig({
        network: Network.TESTNET,
      });
      const aptos = new Aptos(aptosConfig);
      const payload: InputViewFunctionData = {
        function: `${MODULE_ADDRESS}::gamev1::get_leaderboard`,
        functionArguments: [top10],
      };
      const response = await aptos.view({ payload });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const leaderBoardData: LeaderBoardInfo[] = response[0];
      return leaderBoardData;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return null;
    } finally {
      setLoadingFetch(false);
    }
  };

  return { fetchPlayer, fetchLeaderBoard, loadingFetch };
};

export default useGetPlayer;
