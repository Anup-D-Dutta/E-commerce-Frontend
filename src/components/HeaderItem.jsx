import React from "react";
import { NavLink } from "react-router-dom";

const HeaderItem = () => {
  return (
    <div className="hidden container mx-auto lg:flex items-center justify-center h-12 w-full text-lg text-center gap-12 border-black mt-2">
      <div className="flex gap-14  border-black">
        {["shoes", "clothes", "sunglasses", "watches", "brands"].map((item) => (
          <NavLink
            key={item}
            to={`/${item}`}
            className={({ isActive }) =>
              `cursor-pointer ${isActive ? "font-bold text-black" : "text-gray-600"
              } hover`
            }
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HeaderItem;
