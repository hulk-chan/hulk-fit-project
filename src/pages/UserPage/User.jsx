import Navbar from '../../components/Navbar.jsx'
import Caruosel from '../../components/Carousel.jsx'
import { MdDirectionsRun,MdLocalFireDepartment,MdLocationPin} from "react-icons/md";
import { useCookies } from 'react-cookie';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';

const User = () => {
  const [cookies] = useCookies(['user']);
  const fullname = cookies.user.fullname
  return (
    <div className="h-screen">
      <NavbarDesktop />
      <div>
        {/* section 1 for Teader Text */}
        <div className='pt-16 pl-7 lg:pl-16 lg:pt-10'>
          <h1 className='lg:text-[2.5rem] lg:pb-4 text-3xl text-white'><span className='text-[#00ECFF]'>Good</span> Morning <span className='text-[#F53FA1]'>{fullname}</span></h1>
          <h2 className='lg:text-[2.5rem] text-2xl text-white font-light pl-8'>Let&apos;s start your day</h2>
        </div>
        {/* section 2 for Workout News */}
        <div>
        <Caruosel />
        </div>
        {/* section 3 for Workout Progress */}
        <div>
          <div className='pl-7 bg-gradient-to-r from-zinc-700 to-black text-white text-xs p-[4px] lg:text-2xl lg:p-2 lg:pl-16'>YOUR HARD W<span className='text-[#F53FA1]'>O</span>RK PROGRESS</div>
          <div className='flex justify-between m-1 py-4 px-2 lg:justify-start lg:pl-16 lg:gap-x-20'>
            <div className='flex items-center justify-center'>
              <MdDirectionsRun className='text-3xl text-white lg:text-5xl'/>
              <div className='text-white'>
                <p className='text-[10px] lg:text-2xl'>STEPS</p>
                <p className='text-[15px] font-semibold lg:text-2xl'>20,892</p>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <MdLocationPin className='text-3xl text-white lg:text-5xl'/>
              <div className='text-white'>
                <p className='text-[10px] lg:text-2xl'>DISTANCE COVERED</p>
                <p className='text-[15px] font-semibold lg:text-2xl'>15.7 <span className='text-[10px]'>KM</span></p>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <MdLocalFireDepartment className='text-3xl text-white lg:text-5xl'/>
              <div className='text-white'>
                <p className='text-[10px] lg:text-2xl'>CALORIES BURNED</p>
                <p className='text-[15px] font-semibold lg:text-2xl'>793 <span className='text-[10px]'>CAL</span></p>
              </div>
            </div>
          </div>
        {/* Lastest Activity for Desktop */}
          {/* <div className='hidden lg:flex'>
              <div className='bg-white m-6 p-5 h-[100px] rounded-sm'></div>
          </div> */}
        
        {/* Lastest Activity for Mobile */}
          <div className='lg:hidden'>
            <h2 className='pl-7 text-lg font-semibold text-white'>Lastest Activity</h2>
            <div className='bg-white m-6 p-5 h-[100px] rounded-sm'></div>
          </div> 
        
        </div>
      </div>
    </div>
  );
};

export default User;