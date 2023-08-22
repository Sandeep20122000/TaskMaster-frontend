import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {

  const navigate = useNavigate()

  const hangleLogout = () => {
    localStorage.clear()
    navigate('/login')

  }

  return (
    <nav className="bg-gray-900 m-2 rounded-md p-4 flex flex-col w-1/6">
      <div className="text-white mb-10 mt-10 flex flex-col items-center">
        <FontAwesomeIcon icon={faUser} className='text-2xl'/>
        <h1 className={`truncate ${
          props.profile.username.length > 10 ? 'text-xl' : 'text-2xl'
        }`}> {props.profile.username}</h1>
      </div>
      <div className="flex items-center cursor-pointer border border-none w-11/12 px-4 my-3">
        <span className="text-white text-lg ml-2" onClick={() => {navigate('/dashboard')}}>Dashboard</span>
      </div>
      <div className="flex items-center cursor-pointer border border-none w-11/12 px-4 my-3">
        <span className="text-white text-lg ml-2" onClick={() => {navigate('/profile')}}>Profile</span>
      </div>
      <div className="flex items-center cursor-pointer border border-none w-11/12 px-4 my-3">
        <button className="text-white cursor-pointer text-lg ml-2" onClick={hangleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
