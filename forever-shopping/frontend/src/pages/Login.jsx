import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';



const Login = ({ initialState = 'Login' }) => {
  const [currentState, setCurrentState] = useState(initialState);
  const { token, setToken, navigate, backendUrl, setUserRole, setUserId } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    setCurrentState(initialState);
  }, [initialState]);





  const onResetHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/request-password-reset', { email: resetEmail });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const trimmedName = name.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!trimmedName) {
          toast.error('Name is required');
          return;
        }
        if (!emailOk) {
          toast.error('Please enter a valid email');
          return;
        }
        if (password.length < 8) {
          toast.error('Password must be at least 8 characters');
          return;
        }
        const response = await axios.post(backendUrl + '/api/user/register', {
          name: trimmedName,
          email,
          password
        })
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          setUserRole(response.data.role);
          localStorage.setItem('userRole', response.data.role);
          setUserId(response.data.userId);
          localStorage.setItem('userId', response.data.userId);

        } else {
          toast.error(response.data.message)
        }

      } else {

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
          toast.error('Please enter a valid email');
          return;
        }
        if (!password) {
          toast.error('Password is required');
          return;
        }
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          setUserRole(response.data.role);
          localStorage.setItem('userRole', response.data.role);
          setUserId(response.data.userId);
          localStorage.setItem('userId', response.data.userId);

        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const onGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post(backendUrl + '/api/user/google-login', { idToken });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setUserRole(response.data.role);
        localStorage.setItem('userRole', response.data.role);
        setUserId(response.data.userId);
        localStorage.setItem('userId', response.data.userId);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  // Redirect to home page if token is set
  // This will happen when user is logged in
  useEffect(() => {
    if (token) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      navigate(redirect || '/');
    }
  }, [token])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('provider') === 'google') {
      onGoogleSignIn();
    }
  }, []);


  return (
    <div>
      {currentState === 'Reset Password' ? (
        <form onSubmit={onResetHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-red-500">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">Reset Password</p>
            <hr className='border-none h-[1.5px] w-8 bg-red-600' />
          </div>
          <div className="w-full">
            <label htmlFor="resetEmail" className="sr-only">Email</label>
            <input id="resetEmail" onChange={(e) => setResetEmail(e.target.value)} value={resetEmail} type="email" className='w-full px-3 py-2 border border-red-600 bg-black text-red-500 placeholder-red-800' placeholder='Email' required />
          </div>
          <button className='bg-red-600 text-black font-bold px-8 py-2 mt-4 hover:bg-red-700 transition-colors'>Send Reset Link</button>
          <p className='cursor-pointer mt-4 hover:text-red-400' onClick={() => setCurrentState('Login')}>Back to Login</p>
        </form>
      ) : (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-red-500" aria-label={currentState === 'Login' ? 'Login form' : 'Registration form'}>
          <Helmet>
            <title>{currentState} | Fash-Shop</title>
          </Helmet>
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-red-600' />
          </div>

          {currentState === 'Login' ? '' :
            <div className="w-full">
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-red-600 bg-black text-red-500 placeholder-red-800' placeholder='Name' required />
            </div>
          }
          <div className="w-full">
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-red-600 bg-black text-red-500 placeholder-red-800' placeholder='Email' required />
          </div>
          <div className="w-full relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className='w-full px-3 py-2 border border-red-600 bg-black text-red-500 placeholder-red-800'
              placeholder='Password'
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-blue-400"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>



          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer' onClick={() => setCurrentState('Reset Password')}>Forgot your password?</p>
            {
              currentState === 'Login' ?
                <Link to="/sign-up" className='cursor-pointer underline'>Create an account</Link>
                :
                <Link to="/login" className='cursor-pointer underline'>Login Here</Link>
            }

          </div>

          <button className='bg-gradient-to-r from-primary to-secondary text-white font-light px-8 py-2 mt-4 hover:brightness-110' aria-label={currentState === 'Login' ? 'Sign in' : 'Create account'}>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
          <button type="button" onClick={onGoogleSignIn} className='bg-transparent text-brand-blue-50 border border-brand-blue-50 font-light px-8 py-2 mt-2 hover:bg-brand-blue-900/30 transition-colors' aria-label="Continue with Google">Continue with Google</button>

        </form>
      )}
    </div>
  )
}

export default Login
Login.propTypes = {
  initialState: PropTypes.string
}
