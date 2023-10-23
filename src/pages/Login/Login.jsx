import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['authToken', 'user']);

  const loginHandler = async () => {
    const userData = {
      email: email,
      password: password,
    };

    console.log(userData.email, ' - ', userData.password);

    try {
      const response = await axios.post(
        'http://localhost:4000/login',
        userData
      );
      
      const user = response.data.user;

      setCookie('user', user, { path: '/' });

      console.log(cookies.user.fullname);

      navigate('/userhome');
    } catch (error) {
      setError('Invalid Credentail');
    }
  };

  return (
    <div
      className='w-full min-h-screen flex flex-row '
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* <div className='hero-overlay bg-opacity-60'></div> */}
      <div className='
      w-0 sm:w-[50%] md:w-[60%] lg:w-[70%] 
      bg-gradient-to-b from-transparent from-65% to-black flex flex-col justify-end items-start '>
        <div className='p-10'>
          <h1 className='text-white text-5xl font-semibold py-5'></h1>
          <p className='text-white text-xl pb-5'>
            &quot;Empower your mind, fuel your soul; let the energy within
            propel you to remarkable heights of action and achievement.&quot;
          </p>
        </div>
      </div>
      <div className='
      w-[100%] sm:w-[50%] md:w-[40%] lg:w-[30%] 
      bg-[url("/src/assets/bg.png")]'>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-10 text-center text-6xl font-bold leading-9 tracking-tight text-white'>
              Hulk <span className='text-[#00ECFF]'>Fit</span>
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6'>
              <div>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='text'
                    autoComplete='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
                {error && <div className='text-red-500'>{error}</div>}
              </div>

              <div>
                <button
                  onClick={() => loginHandler()}
                  type='button'
                  className='flex w-full justify-center rounded-md bg-[#00ECFF] px-3 py-1.5 text-sm font-bold leading-6 text-black  hover:bg-[#F540A1] hover:text-white'
                >
                  Log In
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-300'>
              Not a member?{' '}
              <Link
                to={'/signup'}
                className='font-semibold leading-6 text-[#F540A1] hover:text-[#00ECFF]'
              >
                Create Account Here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
