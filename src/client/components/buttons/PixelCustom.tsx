import React from "react";
import clsx from "clsx";

const PixelCustom = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("pixel-button w-fit", className)}>{children}</div>
  );
};

export default PixelCustom;
