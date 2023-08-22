import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { loginUser } from '../API/usersAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleInfo} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError ] = useState(null)
  const navigate = useNavigate();

  const { dispatch} = useUserContext()

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser({email, password})

    console.log('Response Data - ', response)

    if (response.ok){
      setError(null)
      const data = await response.json()
      dispatch({type: 'SET_USER', payload: data.user})
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      navigate('/dashboard');

    } else {
      setError('Invalid Credentials')
    }
  };

  return (
    <div className="bg-gray-500 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <div className="bg-gray-900 shadow-2xl rounded-md py-10 px-4 max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 appearance-none rounded-md relative block w-full px-4 py-2 my-5 border border-gray-600 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 appearance-none rounded-md block w-full px-4 py-2 my-5 border border-gray-600 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10" // Removed 'relative' class from input
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-gray-500" // Positioned the icon absolutely
              />
            </div>
          </div>
          <div className='flex justify-end px-2'>
            {/* <a href='#' className='underline'>forgot password?</a> */}
          </div>
          {error && <span className='text-red-500'><FontAwesomeIcon icon={faCircleInfo} /> {error}</span>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
        <div>
            Don't have an account already? <a href='/signin' className='underline'>Sign in!</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
