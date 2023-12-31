import { Link } from 'react-router-dom';
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoReloadCircleOutline,
  IoBarChartOutline,
  IoPersonOutline,
} from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className='lg:hidden'>
      <ul className='flex justify-evenly px-5'>
        <li className='rounded-md w-[52px] h-[52px] bg-[#F53FA1]/80 flex justify-center items-center'>
          <Link to={'/userhome'}>
            <IoHomeOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#F53FA1]/80 flex justify-center items-center'>
          <Link to={'/history'}>
            <IoReloadCircleOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#F53FA1]/80 flex justify-center items-center'>
          <Link to={'/activitytype'}>
            <IoAddCircleOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#F53FA1]/80 flex justify-center items-center'>
          <Link to={'/dashboard'}>
            <IoBarChartOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#F53FA1]/80 flex justify-center items-center'>
          <Link to={'/profile'}>
              <IoPersonOutline className='text-black text-3xl' />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;