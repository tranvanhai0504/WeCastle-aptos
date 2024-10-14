import React from "react";
import { Modal, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface EndGameModalProps {
  open: boolean;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ open }) => {
  return (
    <Modal open={open} className="flex items-center justify-center">
      <div className="flex w-3/4 flex-col items-center justify-around rounded-lg bg-[#222222] px-6 py-10 text-white">
        <h1 className="text-white text-2xl">Play Again?</h1>
        <div className="w-full flex justify-around mt-5">
          <button
            onClick={() => {
              location.reload();
            }}
            className="rounded-lg bg-mainColor px-4 py-1"
          >
            Play Again
          </button>
          <button
            onClick={() => {
              location.href = "/";
            }}
            className="rounded-lg bg-mainColor px-4 py-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EndGameModal;
