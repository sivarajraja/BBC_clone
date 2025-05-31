import logo from '../images/bbc_white.png';
import close from '../images/close.png';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        toast.success("Account Created!");
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black min-h-screen p-5 text-white">
      <Link to="/">
        <img src={close} className="fixed top-6 right-6 h-8" alt="Close" />
      </Link>

      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <img src={logo} alt="logo" className="h-10 mb-6" />
        <h1 className="text-3xl font-bold mb-3 text-center">
          Register for a BBC account
        </h1>
        <p className="text-base font-medium text-center mb-10">
          You must be 18 or over to register for a BBC account
        </p>

        <div className="w-full sm:w-[400px] flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black p-3 border-b-2 border-white text-white text-lg placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black p-3 border-b-2 border-white text-white text-lg placeholder-gray-300 outline-none"
          />

          <button
            onClick={signinHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded transition duration-200"
          >
            Continue
          </button>

          <button
            onClick={googleSignin}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white text-gray-700 font-medium border border-gray-300 hover:shadow-lg transition duration-200 rounded"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>

          <p className="text-sm font-semibold mt-4">
            Already have a BBC account?{' '}
            <Link to="/login" className="underline hover:underline-offset-4">
              Sign in now
            </Link>
          </p>

          <a
            href="https://www.bbc.co.uk/usingthebbc/account/help-signing-in"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 font-semibold underline text-sm"
          >
            Get help signing in
          </a>
        </div>
      </div>

      <div className="mt-12 px-4">
        <a
          href="https://www.bbc.co.uk/usingthebbc/account"
          target="_blank"
          rel="noreferrer"
          className="text-sm hover:underline"
        >
          Find out more about BBC accounts
        </a>

        <div className="border-b border-white my-5"></div>

        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { href: 'https://www.bbc.co.uk/usingthebbc/terms', label: 'Terms of Use' },
            { href: 'https://www.bbc.co.uk/aboutthebbc', label: 'About the BBC' },
            { href: 'https://www.bbc.co.uk/usingthebbc/privacy', label: 'Privacy policy' },
            { href: 'https://www.bbc.co.uk/usingthebbc/cookies', label: 'Cookies' },
            { href: 'https://www.bbc.co.uk/accessibility', label: 'Accessibility Help' },
            { href: 'https://www.bbc.co.uk/iplayer/guidance', label: 'Parental Guidance' },
            { href: 'https://www.bbc.co.uk/contact', label: 'Contact the BBC' },
            { href: 'https://www.bbc.co.uk/bbcnewsletter', label: 'Get Personalised Newsletters' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-sm mt-6">
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

      <ToastContainer autoClose={5000} />
    </div>
  );
};
