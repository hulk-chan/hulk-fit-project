import { Link } from 'react-router-dom';

const NavbarDesktop = () => {
  return (
    <div className='hidden lg:flex justify-between h-[8%] backdrop-blur-3xl'>
    {/* <div className='lg:flex justify-between w-screen h-[8%] hidden  backdrop-blur-3xl'> */}
        {/* LOGO */}
        <div className='w-[40%] '></div>
        {/* List*/}
        <div className='w-[60%] text-2xl flex first-letter:items-center p-4 px-10 text-white'>
            <ul className='flex justify-between w-[100%]'>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/userhome"}>HOME
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/history"}>HISTORY
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/activitytype"}>ADD ACTIVITY
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/dashboard"}>DASHBOARD
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
                <li className='group text-white transition duration-300 hover:scale-125'>
                  <Link to={"/profile"}>PROFILE
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#F53FA1]"></span>
                  </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default NavbarDesktop