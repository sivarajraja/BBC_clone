import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase/setup';
import profile from '../images/profile.png';
import { ToastContainer, toast } from 'react-toastify';

const Comments = (props) => {
  const [comment, setComment] = useState('');
  const [newsComments, setNewsComments] = useState([]);

  const addComment = async () => {
    const newsDoc = doc(database, 'News', `${props.url.substr(-10, 10)}`);
    const commentsRef = collection(newsDoc, 'Comments');

    if (!auth.currentUser) {
      toast.error("Please Login");
      return;
    }

    try {
      await addDoc(commentsRef, {
        comment: comment,
        name: auth.currentUser.displayName,
      });
      toast.success("Comment Added!");
      setComment('');
      displayComments(); // Refresh comments
    } catch (err) {
      console.log(err);
    }
  };

  const displayComments = async () => {
    const newsDoc = doc(database, 'News', `${props.url.substr(-10, 10)}`);
    const commentsRef = collection(newsDoc, 'Comments');
    try {
      const data = await getDocs(commentsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNewsComments(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    displayComments();
  }, []);

  return (
    <div className="w-full max-w-4xl px-4 mx-auto grid gap-6">
      {/* Comment Form */}
      <div className="flex flex-col p-4 mt-9 border rounded-lg shadow-sm">
        <label htmlFor="comment" className="mb-2 font-bold text-lg text-gray-900">
          Leave a Comment:
        </label>
        <textarea
          rows="4"
          className="mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={addComment}
            className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="p-4">
        <label className="block mb-4 font-bold text-lg text-gray-900">
          Comments:
        </label>
        {newsComments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          newsComments.map((news) => (
            <div key={news.id} className="border my-3 px-6 py-4 rounded-lg shadow-sm bg-white">
              <div className="flex items-center gap-2">
                <img src={profile} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
                <h1 className="font-bold text-gray-800">{news.name}</h1>
              </div>
              <p className="text-base text-gray-800 mt-3">{news.comment}</p>
              <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-500">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-gray-700">
                    <i className="far fa-thumbs-up"></i> Like
                  </a>
                  <a href="#" className="hover:text-gray-700">
                    <i className="far fa-comment-alt"></i> Reply
                  </a>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-gray-700">
                    <i className="far fa-flag"></i> Report
                  </a>
                  <a href="#" className="hover:text-gray-700">
                    <i className="far fa-share-square"></i> Share
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Comments;
