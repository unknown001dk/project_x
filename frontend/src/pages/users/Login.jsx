import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toastError, toastSucess } from '../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStart, LoginSuccess, LoginFailure } from '../../redux/user/userSlice';

function Login() {
  const [user, setUser] = useState({});
  const { loading, state } = useSelector((state) => state.user);
  const [error, SetError ] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({
      ...user, 
      [e.target.id]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(LoginStart());
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await res.json();
      const success = data.success;
      const message = data.message;

      if (success === true) {
        navigate('/')
        dispatch(LoginSuccess(data));
        toastSucess(message);
      } else {
        dispatch(LoginFailure(data));
        toastError(message);
      }
    } catch (error) {
      console.log(error);
      // dispatch(LoginError(error));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto mt-48 md:mt-44'>
    <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input
        onChange={handleChange}
        className='bg-slate-100 p-3 rounded-lg'
        type="email"
        placeholder='Email'
        id='email' />
      <input
        onChange={handleChange}
        className='bg-slate-100 p-3 rounded-lg'
        type="password"
        placeholder='Password'
        id='password' />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Login
        </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Not have an account?</p>
      <Link to='/register'>
        <span className='text-blue-500 '>Register</span>
      </Link>
    </div>
    <p className='text-red-700 mt-5'>
      {error ? error.message || 'something went wrong' : ''}
    </p>
    </div>
  )
}

export default Login