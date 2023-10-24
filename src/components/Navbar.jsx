import { Link } from 'react-router-dom';
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoBarChartOutline,
  IoPersonOutline,
} from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className='lg:hidden'>
      <ul className='flex justify-evenly px-5'>
        <li className='rounded-md w-[52px] h-[52px] bg-[#D9D9D9] flex justify-center items-center'>
          <Link to={'/'}>
            <IoHomeOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#D9D9D9] flex justify-center items-center'>
          <Link to={''}>
            <IoPeopleOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#D9D9D9] flex justify-center items-center'>
          <Link to={'/activitytype'}>
            <IoAddCircleOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#D9D9D9] flex justify-center items-center'>
          <Link to={'/dashboard'}>
            <IoBarChartOutline className='text-black text-3xl' />
          </Link>
        </li>

        <li className='rounded-md w-[52px] h-[52px] bg-[#D9D9D9] flex justify-center items-center'>
          <Link to={'/profile'}>
              <IoPersonOutline className='text-black text-3xl' />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;