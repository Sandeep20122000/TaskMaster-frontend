import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../API/usersAPI'
import { useUserContext } from '../hooks/useUserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const {dispatch} = useUserContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add sign-in logic here, like making an API call or validating the credentials.
    console.log('Sign-in details:', { username, email, password });

    const data = await createUser({username, email, password})

    if (data) {
      dispatch({type: 'SET_USER', payload: data})
      localStorage.setItem("currentUser", JSON.stringify(data));
      console.log('navigating')
      navigate('/dashboard');
    } else {
      throw Error('Error user unable to signin')
    }


  };

  return (
    <div className="bg-gray-500 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <div className=" bg-gray-900 shadow-2xl rounded-md text-gray-200 max-w-md w-full space-y-8 py-10 px-4 ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div>
                <input 
                  id="username"
                  name='username'
                  type='text'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-200 appearance-none rounded-md relative block w-full px-4 py-2 my-5 border border-gray-200 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 appearance-none rounded-md relative block w-full px-4 py-2 my-5 border border-gray-200 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className='relative'>
            <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 appearance-none rounded-md block w-full px-4 py-2 my-5 border border-gray-600 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-gray-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div>
        <div>
            Already have an account? <a href='/login' className='underline'>Login!</a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
