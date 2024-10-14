import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import useCredit from "../../hooks/useCredit";
import Timer from "../../components/timer/Timer";
import AuthContext from "../../contexts/AuthProvider";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

import { useAlert } from "../../contexts/AlertProvider";

const maps = [
  {
    id: 1,
    image: "/game-map/Castle_Blue.png",
  },
  {
    id: 2,
    image: "/game-map/Castle_Purple.png",
  },
  {
    id: 3,
    image: "/game-map/Castle_Red.png",
  },
  {
    id: 4,
    image: "/game-map/Castle.png",
  },
];

const HomeMobile = () => {
  const { claimCredit } = useCredit();
  const auth = useContext(AuthContext);

  const [currentMap, setCurrentMap] = useState(1);
  const [selectedMap, setSelectedMap] = useState(1);
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const [isClaiming, setIsClaiming] = useState(false);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const handleClaimCredit = async () => {
    if (!auth?.keylessWalletAddress) return;
    setIsClaiming(true);
    claimCredit().then(async () => {
      await auth?.fetchCreditInfor(auth.keylessWalletAddress);
      await auth?.fetchPlayerInfo(auth.keylessWalletAddress);
      setIsClaiming(false);
      setAlert("+3 Credit for play game!", "success")
    });
  };

  useEffect(() => {
    if (!auth) return;

    const test = new Date(
      Number(auth.player.last_claim_time) / 1000 + 86400000
    );

    setExpiryTimestamp(test);

    const crtMap =
      maps.find((map) => {
        return (
          map.id ===
          (auth?.player.game_finished || auth?.player.current_round == 0
            ? auth?.player.current_round + 1
            : auth?.player.current_round)
        );
      })?.id || 1;

    setCurrentMap(crtMap);
    setSelectedMap(crtMap);
  }, [auth, auth?.player]);

  const handleChangeLevel = (isNext: boolean) => {
    if (isNext) {
      setSelectedMap((prev) => prev + 1);
    } else {
      setSelectedMap((prev) => prev - 1);
    }
  };

  const handlePlayGame = () => {
    if (!auth) return;
    if (auth?.CreditInfor > 0) {
      navigate("/playGame");
    } else {
      setAlert(
        "You don't have any credit for play game. Please claim more credit.",
        "info"
      );
    }
  };

  return (
    <div
      id="home"
      className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center px-8"
    >
      <div className="flex w-full flex-grow flex-col justify-center py-16 text-white">
        {/* game */}
        <div className="relative z-10 flex w-full flex-col justify-between">
          <div className="flex w-full justify-center">
            <h1 className="border-b-2 border-white px-5 text-3xl text-mainColor">
              MAP {`${selectedMap !== 4 ? "0" + selectedMap : "???"}`}
            </h1>
          </div>
          <div className="flex w-full items-center justify-between text-2xl">
            <button
              onClick={() => {
                if (selectedMap > 1) handleChangeLevel(false);
              }}
            >
              <FaCaretLeft />
            </button>
            <img
              src={
                maps.find((map) => {
                  return map.id === selectedMap;
                })?.image
              }
              className="h-full w-2/3 object-cover shadow-inner brightness-75"
            />
            <button
              onClick={() => {
                if (selectedMap < maps.length) handleChangeLevel(true);
              }}
            >
              <FaCaretRight />
            </button>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <button
              disabled={currentMap !== selectedMap}
              className="disabled:opacity-15"
            >
              <button
                // to="/playGame"
                onClick={handlePlayGame}
                className="border-2 border-white px-10 py-2 text-2xl hover:bg-white"
              >
                Play
              </button>
            </button>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex w-full flex-col items-center space-y-2 p-4 text-xl">
              <img src="/tower.png" />
              <button
                className="w-full rounded-lg bg-mainColor py-1 text-2xl text-black disabled:cursor-not-allowed disabled:text-gray-500 disabled:opacity-80"
                onClick={handleClaimCredit}
                disabled={new Date() < expiryTimestamp || isClaiming}
              >
                {isClaiming
                  ? "Claiming..."
                  : `Claim ${new Date() > expiryTimestamp ? "+3" : ""}`}
              </button>
              <Timer expiryTimestamp={expiryTimestamp} />
            </div>
            <div className="flex w-full flex-col items-center space-y-2 p-4 text-xl">
              <img src="/house.png" />
              <span className="flex flex-col items-center font-light">
                <p>Marketplace</p>
                <p className="text-base">(Coming Soon)</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobile;
