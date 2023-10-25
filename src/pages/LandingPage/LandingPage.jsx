import React from "react";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    // className="bg-[url('/assets/girl.png')] h-screen bg-no-repeat bg-cover bg-center"
    <div className="">
      {/* section header text */}
      
      <div className="relative h-screen z-10 lg:flex lg:justify-between ">
        <div className="lg:w-[50%] lg:h-full lg:flex lg:flex-col lg:justify-center lg:items-center">
          <div className="text-center lg:flex lg:flex-col">
            <h1 className=" text-[64px] text-cyan-400 font-bold pt-6 lg:text-[7rem] lg:pt-0">HULK FIT</h1>
            <h3 className=" text-white font-light pl-6 lg:text-[2rem] lg:pb-10">
              The App That Builds{" "} 
              <div className="hidden lg:flex">
              </div>
              <span className="text-cyan-400 font-bold">More Than</span> Muscles
            </h3>

            <div className=" h-1/4 hidden lg:flex lg:justify-center items-center scale-125 gap-x-10">
            <Link to={"/login"}>
              <button className="text-black font-semibold bg-[#00ECFF] h-12 w-28 rounded-full text-xl max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe]">
                LOGIN
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="text-black font-semibold bg-[#F540A1] h-12 w-28 rounded-full text-xl max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe]">
                SIGN UP
              </button>
            </Link>
          </div>

          </div>

          <div className="w-screen h-1/4 absolute bottom-0 justify-evenly items-center flex lg:hidden">
            <Link to={"/login"}>
              <button className="text-black font-semibold bg-[#00ECFF] h-12 w-28 rounded-full text-xl max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe]">
                LOGIN
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="text-black font-semibold bg-[#F540A1] h-12 w-28 rounded-full text-xl max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe]">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
{/* section image */}
{/* Desktop */}
        <div className=" w-[50%] h-screen  lg:flex hidden lg:justify-center">
          <img src="/assets/pngwing 1.png" alt="" className="h-[90%] object-cover absolute bottom-0 shadow-inner-2xl before:mx-auto" />
        </div>
      </div>
{/* Mobile */}
      <div className="absolute bottom-0 w-[100%] h-screen flex justify-center lg:hidden">
        <img src="/assets/pngwing 1.png" alt="" className="h-[75%] object-cover absolute bottom-0 shadow-inner-2xl" />
      </div>
    </div>

  );
};

export default LandingPage;
