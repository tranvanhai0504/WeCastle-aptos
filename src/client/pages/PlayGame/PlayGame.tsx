import React, { useState, useEffect, useContext } from "react";
import { Modal } from "@mui/material";
import UnityGameComponent, { useUnityGame } from "../../hooks/useUnityGame";

import useGame from "../../hooks/useGame";

import EndGameModal from "../../components/EndGameModal/EndGameModal";
import AuthContext from "../../contexts/AuthProvider";

const PlayGame: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);
  const { playRound } = useGame();
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isSign, setIsSign] = useState(false);

  useEffect(() => {
    if (!auth) return;

    if (isLoaded && !isSign) {
      setLoadGame(false);
      playRound(
        auth.player.current_round !== 0 ? auth.player.current_round : 1
      ).then(async () => {
        setIsSign(true);
        await auth.fetchCreditInfor(auth.player.address_id);
      });
    }
  }, [isLoaded, auth, playRound, isSign]);

  return (
    <>
      <EndGameModal open={isEndGameModalOpen} />
      {!loadGame ? (
        <div className="h-full w-full">
          <UnityGameComponent setIsEndGameModalOpen={setIsEndGameModalOpen} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default PlayGame;
