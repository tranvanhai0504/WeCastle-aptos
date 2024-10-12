import React from "react";
import { Modal, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface EndGameModalProps {
  open: boolean;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ open }) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} className="flex items-center justify-center">
      <div className="flex w-3/4 items-center justify-around rounded-lg bg-[#222222] px-6 py-16 text-white">
        <button
          onClick={() => {
            navigate("/playGame");
          }}
          className="rounded-lg bg-mainColor px-4 py-1"
        >
          Play Again
        </button>
        <Link to="/" className="rounded-lg bg-mainColor px-4 py-1">
          Back to Home
        </Link>
      </div>
    </Modal>
  );
};

export default EndGameModal;
