import React from 'react';
import { useLocation } from 'react-router-dom';
import back from '../images/back.png';
import logo from '../images/bbc_black.png';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const NewsDetails = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="fixed top-0 left-0 w-full flex items-center justify-center border border-gray-300 bg-white z-50 py-2 px-4 md:py-2">
        <Link to="/">
          <img
            src={back}
            alt="Back"
            className="absolute left-5 top-5 h-8 md:h-9 p-1 border border-black rounded hover:bg-gray-100 cursor-pointer"
          />
        </Link>
        <img src={logo} alt="BBC Logo" className="h-16 md:h-20" />
      </div>

      <div className="mx-auto mt-28 px-4 sm:px-6 md:px-0 w-full max-w-4xl">

        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-gray-800 font-semibold mb-6">
          {location.state.data.title}
        </h1>

        <div className="flex flex-col items-start text-gray-600 text-sm sm:text-base mb-8 ml-2 sm:ml-6 space-y-1">
          <p className="font-light">4 hours ago</p>
          <p className="font-bold">{location.state.data.author ? location.state.data.author : "Author"}</p>
          <p className="font-light">Creator - BBC News</p>
        </div>

        {location.state.data.urlToImage && (
          <img
            src={location.state.data.urlToImage}
            alt={location.state.data.title}
            className="w-full rounded-md object-cover mb-8 max-h-96 mx-auto"
          />
        )}

        <p className="text-base sm:text-lg md:text-xl text-gray-800 text-center leading-relaxed mb-12 px-2 sm:px-0">
          {location.state.data.description}{location.state.data.content}
        </p>

        <Comments url={location.state.data.urlToImage} />
      </div>
    </div>
  );
};

export default NewsDetails;
