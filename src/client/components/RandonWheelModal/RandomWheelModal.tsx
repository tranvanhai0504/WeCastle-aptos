// import React from "react";
// import { Modal, Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// import WheelComponent from "react-wheel-of-prizes";
// import "react-wheel-of-prizes/dist/index.css";

// interface RandomWheelModalProps {
//   open: boolean;
// }

// const RandomWheelModal: React.FC<RandomWheelModalProps> = ({ open }) => {
//   const segments = [
//     "better luck next time",
//     "won 70",
//     "won 10",
//     "better luck next time",
//     "won 2",
//     "won uber pass",
//     "better luck next time",
//     "won a voucher",
//   ];
//   const segColors = [
//     "#EE4040",
//     "#F0CF50",
//     "#815CD1",
//     "#3DA5E0",
//     "#34A24F",
//     "#F9AA1F",
//     "#EC3F3F",
//     "#FF9000",
//   ];
//   const onFinished = (winner: string) => {
//     console.log(winner);
//   };

//   return (
//     <Modal open={open} className="flex items-center justify-center">
//       <div className="flex w-3/4 flex-col items-center justify-around rounded-lg bg-[#222222] px-6 py-10 text-white">
//         <h1 className="text-white text-2xl">Time to spinning</h1>
//         <div className="w-full flex justify-around mt-5">
//           <WheelComponent
//             segments={segments}
//             segColors={segColors}
//             winningSegment="won 10"
//             onFinished={(winner: string) => onFinished(winner)}
//             primaryColor="black"
//             contrastColor="white"
//             buttonText="Spin"
//             isOnlyOnce={false}
//             size={290}
//             upDuration={100}
//             downDuration={1000}
//             fontFamily="Arial"
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default RandomWheelModal;
