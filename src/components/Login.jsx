import React from "react";
import { Github } from "lucide-react";

const Login = () => {
  return (
    <div className="login border border-2  ">
      <div>
        <span className="font-bold text-3xl">Welcome to</span>
        <div className="logo font-bold text-black text-3xl ">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          {/* <img className='size-5 my-2' src="icons/pass09.png" alt="" ></img> */}
          <span className="text-green-500">OP/&gt;</span>
        </div>
      </div>

      <button
        className="gap-0
    md:gap-2 flex justify-center items-center  bg-green-600 px-2 md:px-4 mx-2 py-2
     rounded-full text-center shadow-lg transform transition-transform duration-300 hover:bg-green-400 hover:scale-105 ring-white ring-1
    "
      >
        <Github />
        <span
          className="text-black
          font-bold
           "
        >
          Login With Github
        </span>
      </button>
    </div>
  );
};

export default Login;
