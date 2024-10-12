import { useContext, forwardRef, useEffect, useCallback } from "react";
import { Unity } from "react-unity-webgl";
import styled from "styled-components";
import UnityGameContext from "../contexts/UnityGameProvider";
import { Box } from "@mui/material";
import AuthContext from "../contexts/AuthProvider";
import useGame from "../hooks/useGame";

export const useUnityGame = () => useContext(UnityGameContext);

const UnityGame = styled(Unity)`
  width: 100%;
  height: 100%;
`;

const UnityGameComponent = forwardRef(
  (
    props: {
      setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    },
    ref
  ) => {
    const { unityProvider } = useUnityGame();

    const { endGame } = useGame();
    const auth = useContext(AuthContext);

    const handleComponentEvent = ({
      detail,
    }: CustomEvent<{ Score: number }>) => {
      const { Score } = detail;

      if (!auth) return;

      const round =
        auth.player.current_round !== 0 ? auth.player.current_round : 1;

      endGame(round, Score).then((res) => {
        props.setIsEndGameModalOpen(true);
      });
    };

    useEffect(() => {
      // Add the event listener
      addEventListener(
        "PushRewardForPlayerEvent",
        handleComponentEvent as EventListener
      );

      // Clean up the event listener on unmount
      return () => {
        removeEventListener(
          "PushRewardForPlayer",
          handleComponentEvent as EventListener
        );
      };
    }, []);

    return <UnityGame unityProvider={unityProvider} />;
  }
);

export default UnityGameComponent;
