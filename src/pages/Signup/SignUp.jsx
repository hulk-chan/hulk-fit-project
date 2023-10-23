import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [images, setImages] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const navigate = useNavigate();


  const defaultImage =
    'https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg';

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = URL.createObjectURL(images);
    setImageURLs(newImageURLs);

    console.log('image is :', images);
    console.log('imageurl is :', imageURLs);
  }, [images]);

  const onImageChange = (e) => {
    setImages(e);
  };

  const signupHandler = async () => {
    console.log('signup click');
    
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', images);

    try {
      const response = await axios.post(
        'http://localhost:4000/signup',
        formData
      );
      console.log('Response from backend:', response.data, response.status);
      alert(`Welcome new Member your Signup Complete Code:${response.status}\n
      Here recheck your data \n
      fullname: ${response.data.fullname}\n
      email: ${response.data.email}\n
      password: ${response.data.password}\n
      image: ${response.data.image}\n
      date: ${response.data.date}
      `)
      navigate('/login')

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className='w-full min-h-screen flex flex-row '
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
          <h1 className='text-white text-5xl font-semibold py-5'>Hulk Fit</h1>
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
              Hulk <span className='text-light-blue'>Fit</span>
            </h2>
          </div>

          <div className='flex flex-row justify-center align-middle mt-10'>
            <div className='avatar'>
              <div className='w-24 h-24 rounded-full ring ring-[#F540A1] ring-offset-[#F540A1] ring-offset-2'>
                <img src={images.length < 1 ? defaultImage : imageURLs} />
              </div>
            </div>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6'>
              
                <div className='mt-2'>
                  <input
                    name='fullname'
                    type='text'
                    required
                    value={fullname}
                    placeholder='Enter fullName'
                    onChange={(e) => setFullName(e.target.value)}
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              

              
                <div className='mt-2'>
                  <input
                    name='email'
                    type='text'
                    value={email}
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              

              
                <div className='mt-2'>
                  <input
                    name='password'
                    type='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              

              
                
                <div className='mt-2'>
                  <input
                    id='repassword'
                    name='repassword'
                    type='password'
                    value={repassword}
                    placeholder='Enter re-password'
                    onChange={(e) => setRePassword(e.target.value)}
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              

              
                
                <div className='mt-2'>
                  <input
                    name='image'
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={(e) => onImageChange(e.target.files[0])}
                    className='bg-transparent block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6'
                  />
                </div>
              

              <div>
                <button
                  onClick={() => signupHandler()}
                  type='button'
                  className='flex w-full justify-center rounded-md bg-[#00ECFF] px-3 py-1.5 text-sm font-bold leading-6 text-black  hover:bg-[#F540A1] hover:text-white'
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-300'>
              Already a member?{' '}
              <Link
                to={'/login'}
                className='font-semibold leading-6 text-[#F540A1] hover:text-[#00ECFF]'
              >
                Login.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
