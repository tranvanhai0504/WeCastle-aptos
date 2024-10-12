import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const items = [
  { text: "Docs", to: "/docs", icon: "doc" },
  { text: "Home", to: "/", icon: "home" },
  { text: "Daily task", to: "/task", icon: "task" },
];

const SideBar = () => {
  const [selected, setSelected] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative w-full">
      <div className="absolute bottom-0 z-0 w-full">
        <div
          className={clsx(
            "absolute bottom-0 left-0 !h-[69px] lg:!h-[100px] !w-[35vw] bg-[#DDDDDD] duration-500",
            selected === items[0].to ? "-translate-x-full" : "-translate-x-0",
          )}
        ></div>
        <img
          src="/subtract.svg"
          className={clsx(
            "absolute bottom-0 z-0 w-[100vw] !h-[69px] lg:!h-[100px] transition-transform duration-500 object-cover",
            selected === items[0].to && "-translate-x-1/3",
            selected === items[2].to && "translate-x-1/3",
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 right-0 !h-[69px] lg:!h-[100px] !w-[35vw] bg-[#DDDDDD] duration-500",
            selected === items[2].to ? "translate-x-full" : "translate-x-0",
          )}
        ></div>
      </div>
      <div className="relative z-10 flex w-full justify-between pb-2 text-black">
        {items.map((item, index) => {
          return (
            <div key={index} className="flex w-1/3 justify-center">
              <NavLink
                to={item.to}
                className={clsx(
                  "flex w-16 lg:w-32 flex-col items-center text-center text-xl transition-all duration-700",
                  selected === item.to
                    ? "aspect-square -translate-y-4 justify-center rounded-full bg-mainColor text-white"
                    : "-translate-y-0 justify-end text-black",
                )}
              >
                <img
                  src={`/icons/${item.icon}-${selected === item.to ? "light" : "dark"}.svg`}
                />
                <p
                  className={clsx(
                    "text-nowrap",
                    selected === item.to && "hidden",
                  )}
                >
                  {item.text}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
