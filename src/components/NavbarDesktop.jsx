import React from 'react'
import { Link } from 'react-router-dom';

const NavbarDesktop = () => {
  return (
    <div className=' z-40 bg-black lg:flex justify-between w-screen h-[8%] hidden  backdrop-blur-3xl'>
        {/* LOGO */}
        <div className='w-[40%] '></div>
        {/* List*/}
        <div className='w-[60%] text-2xl flex first-letter:items-center p-4 px-10 text-white'>
            <ul className='flex justify-between w-[100%]'>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"#"}>HOME
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"#"}>COMMUNITY
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/activitytype"}>ADD ACTIVITY
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/dashboard"}>DASHBOARD
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"#"}>PROFILE
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default NavbarDesktop