import React from 'react';
import search from '../images/search.png';
import logo from '../images/bbc_black.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';

export const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('logged out!');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed w-screen bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 px-4 md:px-8 py-3 gap-4">
        <div className="block md:hidden w-full flex justify-center">
          <img src={logo} className="h-10" />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex items-center w-full md:w-auto">
            <img src={search} className="h-5 md:h-6 mr-2" />
            <input
              type="text"
              placeholder="Search BBC"
              onChange={(e) => props.setSearch(e.target.value)}
              className="w-full md:w-64 border px-3 py-1.5 rounded text-sm"
            />
          </div>

          <div className=" justify-center items-center w-full md:w-auto">
            <img src={logo} className=" hidden md:flex h-12" />
          </div>

          {auth.currentUser ? (
            <button
              className="text-white font-bold bg-black h-10 w-24 rounded"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <Link to="/signup">
                <button className="text-white font-bold bg-black h-10 w-24 rounded">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="text-black font-bold border border-gray-700 hover:text-white hover:bg-gray-800 h-10 w-24 rounded">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center border-b border-gray-200 font-bold text-sm overflow-x-auto">
        <button
          onClick={() => props.setMenu('All')}
          className={`hover:bg-gray-200 p-3 ${
            props.menu === 'All' ? 'bg-gray-700 text-white' : ''
          }`}
        >
          Home
        </button>

        <button
          onClick={() => props.setMenu('business')}
          className="hover:bg-gray-200 p-3"
        >
          Business
        </button>

        <button
          onClick={() => props.setMenu('health')}
          className="hover:bg-gray-200 p-3"
        >
          Health
        </button>

        <button
          onClick={() => props.setMenu('entertainment')}
          className="hover:bg-gray-200 p-3"
        >
          Travel
        </button>

        <button
          onClick={() => props.setMenu('Science')}
          className="hidden sm:block hover:bg-gray-200 p-3"
        >
          Science
        </button>

        <button
          onClick={() => props.setMenu('sports')}
          className="hidden sm:block hover:bg-gray-200 p-3"
        >
          Sports
        </button>

        <button
          onClick={() => props.setMenu('Worklife')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Innovation
        </button>

        <button
          onClick={() => props.setMenu('technology')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Arts
        </button>

        <button
          onClick={() => props.setMenu('general')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Earth
        </button>

        <div className="hidden md:block border-l-2 border-gray-200 my-2"></div>

        <button
          onClick={() => props.setMenu('sports')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Audio
        </button>

        <button
          onClick={() => props.setMenu('sports')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Video
        </button>

        <button
          onClick={() => props.setMenu('sports')}
          className="hidden md:block hover:bg-gray-200 p-3"
        >
          Live
        </button>
      </div>
    </div>
  );
};
