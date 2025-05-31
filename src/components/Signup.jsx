import logo from '../images/bbc_white.png';
import close from '../images/close.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

export const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      auth.currentUser && navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Check credentials.");
    }
  };

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      auth.currentUser && navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <Link to="/">
        <img src={close} alt="Close" className="fixed top-6 right-6 h-8 cursor-pointer" />
      </Link>
      <ToastContainer autoClose={5000} />

      <div className="max-w-xl mx-auto mt-24 text-center">
        <img src={logo} alt="logo" className="h-10 mx-auto mb-6" />
        <h1 className="text-white text-3xl font-bold mb-3">Sign into your BBC account</h1>
        <h2 className="text-white text-xl mb-10">Enter your email</h2>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black text-white text-lg p-3 border-b-2 border-white focus:outline-none focus:border-blue-500 mb-6"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black text-white text-lg p-3 border-b-2 border-white focus:outline-none focus:border-blue-500 mb-6"
          />

          <button
            onClick={signinHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-bold py-3 rounded-sm mb-4"
          >
            Continue
          </button>

          <button
            onClick={googleSignin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 font-medium rounded-sm shadow hover:shadow-lg transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>

          <p className="text-white text-left font-semibold mt-6">
            Sign in and we’ll help you discover more things you’ll love.
          </p>

          <div className="text-left mt-4 space-y-2">
            <p className="text-blue-500 underline underline-offset-4 font-semibold cursor-pointer">
              I have forgotten my email
            </p>
            <p className="text-blue-500 underline underline-offset-4 font-semibold cursor-pointer">
              More help signing in
            </p>
          </div>
        </div>

        <h3 className="text-white text-lg mt-10">Don’t have a BBC account?</h3>
        <Link to="/signup">
          <p className="text-blue-500 underline font-semibold underline-offset-4 mt-2">
            Register now
          </p>
        </Link>
      </div>

      <div className="mt-16 text-center text-white text-sm space-y-4">
        <a
          href="https://www.bbc.co.uk/usingthebbc/account"
          target="_blank"
          className="hover:underline"
          rel="noreferrer"
        >
          Find out more about BBC accounts
        </a>

        <div className="border-t border-white w-full my-5"></div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            ['Terms of Use', 'https://www.bbc.co.uk/usingthebbc/terms'],
            ['About the BBC', 'https://www.bbc.co.uk/aboutthebbc'],
            ['Privacy policy', 'https://www.bbc.co.uk/usingthebbc/privacy'],
            ['Cookies', 'https://www.bbc.co.uk/usingthebbc/cookies'],
            ['Accessibility Help', 'https://www.bbc.co.uk/accessibility'],
            ['Parental Guidance', 'https://www.bbc.co.uk/iplayer/guidance'],
            ['Contact the BBC', 'https://www.bbc.co.uk/contact'],
            ['Get Personalised Newsletters', 'https://www.bbc.co.uk/bbcnewsletter'],
          ].map(([text, url]) => (
            <a
              key={text}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {text}
            </a>
          ))}
        </div>

        <p className="mt-5">
          © 2025 BBC. The BBC is not responsible for the content of external sites.{' '}
          <a
            href="https://www.bbc.co.uk/help/web/links/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Read about our approach to external linking.
          </a>
        </p>
      </div>
    </div>
  );
};
