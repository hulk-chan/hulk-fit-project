import Navbar from '../../components/Navbar.jsx'
import Caruosel from '../../components/Carousel.jsx'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
import axios from 'axios';



const UserPage = () => {
  const [cookies] = useCookies(['user']);
  const fullname = cookies.user.fullname;
  const userId = cookies.user._id
  const [lastActivity, setLastActivity] = useState([]);

  useEffect(() => {
    axios.get(`https://hulkfit-backend-wowi.onrender.com/activitylist/${userId}`)
      .then((result) => {
        // Set Lasted Activity to State
        setLastActivity(result.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(lastActivity)
  
  
  return (
    <div className="h-screen">
      <NavbarDesktop />
      <div>
        {/* section 1 for Teader Text */}
        <div className='pt-16 pl-7 lg:pl-16 lg:pt-10'>
          <h1 className='lg:text-[2.5rem] lg:pb-4 text-3xl text-white'><span className='text-[#00ECFF] text-center'>Good</span> Morning <span className='text-[#F53FA1]'>{fullname.toUpperCase()}</span></h1>
          <h2 className='lg:text-[2.5rem] text-2xl text-white font-light pl-8'>Let&apos;s start your day</h2>
        </div>
        {/* section 2 for Workout News */}
        <div>
          <Caruosel />
        </div>
        {/* section 3 for Lasted Activity */}
        <div className='w-[100%]'>
          <div className='flex w-[100%] bg-gradient-to-r from-zinc-700 to-black'>
            <div className='pl-7 text-white text-xl p-[4px] lg:text-2xl lg:p-2 lg:pl-16'>YOUR LASTED ACTIVITY</div>
          </div>
          {/* CARD DESKTOP MODE */}
          <div className='justify-between rounded-xl h-56 m-4 p-[10px] hidden lg:flex'>

            {lastActivity.slice(0,3).reverse().map((activity, index) => (
              <div
                key={index}
                className="w-[30%] bg-black/30 rounded-3xl text-white text-1xl cursor-pointer hover:scale-105 transition ease-in-out border border-slate-700"
              >
                <div className="h-[25%] rounded-t-3xl bg-gradient-to-r from-[#00ECFF]/80 to-[#F53FA1]/80">
                  {/* Card */}
                </div>
                <div className="pl-5 pt-[10px] text-[16px]">
                  <p className='text-[#00ECFF]/80'>ACTIVITY TYPE : <span className='text-white/90'>{activity.actType.toUpperCase()}</span></p>
                  <p className='text-[#00ECFF]/80'>DATE : <span className='text-white/90'>{activity.actDate}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY NAME : <span className='text-white'>{activity.actName}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY DESCRIPTION : <span className='text-white'>{activity.actDescription}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY DURATION (Mins) : <span className='text-white'>{activity.actDuration}</span></p>
                </div>
              </div>
            ))}
          </div>
          {/* CARD MOBILE MODE  */}
          
          <div className='justify-between rounded-xl h-56 m-4 p-[5px] flex lg:hidden'>

            {lastActivity.reverse().slice(0,1).map((activity, index) => (
              <div
                key={index}
                className="h-[80] w-[100%] bg-black/30 rounded-3xl text-white text-1xl cursor-pointer hover:scale-105 transition ease-in-out border border-slate-700"
              >
                <div className="h-[20%] rounded-t-3xl bg-gradient-to-r from-[#00ECFF]/80 to-[#F53FA1]/80">
                  {/* Card */}
                </div>
                <div className="pl-3 pt-[10px] text-[16px]">
                  <p className='text-[#00ECFF]/80'>ACTIVITY TYPE : <span className='text-white'>{activity.actType.toUpperCase()}</span></p>
                  <p className='text-[#00ECFF]/80'>DATE : <span className='text-white'>{activity.actDate}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY NAME : <span className='text-white'>{activity.actName}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY DESCRIPTION : <span className='text-white'>{activity.actDescription}</span></p>
                  <p className='text-[#00ECFF]/80'>ACTIVITY DURATION (Mins) : <span className='text-white'>{activity.actDuration}</span></p>
                </div>
              </div>
            ))}
          </div>

          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default UserPage;