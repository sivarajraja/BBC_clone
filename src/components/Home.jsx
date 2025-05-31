import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase/setup';
import { doc, setDoc } from 'firebase/firestore';

const Home = (props) => {
  const [news, setNews] = useState([]);

  const addNews = async (data) => {
    const docId = data.urlToImage
      ? data.urlToImage.slice(-10)
      : data.title.slice(0, 10);
    const newsDoc = doc(database, 'News', docId);
    try {
      await setDoc(newsDoc, {
        title: data.title,
        description: data.description,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getNews = async () => {
    try {
      const res = await fetch('/news.json');
      const json = await res.json();

      if (json.status !== 'ok') throw new Error('Failed to fetch news');

      setNews(json.articles);
    } catch (error) {
      console.error('Error fetching news:', error.message);
      setNews([]);
    }
  };

  useEffect(() => {
    getNews();
  }, [props.menu]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mb-7">
      <div className="mt-56 md:mt-32 px-4 sm:px-6 lg:px-8 container mx-auto">
        {news.length === 0 ? (
          <p className="text-center text-gray-600">No news available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {news
              .filter(
                (data) =>
                  !props.search ||
                  data.title.toLowerCase().includes(props.search.toLowerCase())
              )
              .map((data) => (
                <Link
                  key={data.url}
                  onClick={() => addNews(data)}
                  to="/details"
                  state={{ data }}
                >
                  <div className="bg-white h-full rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
                    <img
                      className="w-full h-48 object-cover"
                      src={
                        data.urlToImage ||
                        'https://via.placeholder.com/400x300?text=No+Image'
                      }
                      alt={data.title || 'News Image'}
                    />
                    <div className="px-5 py-4">
                      <h2 className="font-bold text-lg mb-2 hover:underline underline-offset-2">
                        {data.title}
                      </h2>
                      <p className="text-gray-700 text-sm">
                        {data.content || data.description || 'No content available.'}
                      </p>
                    </div>
                    <div className="px-5 pb-4 text-xs text-gray-500 flex justify-between">
                      <span>3 hrs ago</span>
                      <span>US</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
