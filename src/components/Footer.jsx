import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 flex justify-around items-center  text-white h-16  w-full">
      <div>
        <div className="logo font-bold text-white text-xl  md:text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt; </span>

          <span className="font-semibold text-base  md:text-lg">
            Created by 💖 by Akash
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
