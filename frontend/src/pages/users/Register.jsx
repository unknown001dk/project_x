import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTitle } from '../../utils/PageTitle';
import { toastError, toastSucess } from '../../utils/Toast';

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
        ...formData, 
        [e.target.id]: e.target.value 
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      const success = data.success;
      const message = data.message;

      if (success === true) {
        navigate('/login')
        toastSucess(message);
      } else {
        toastError(message);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <PageTitle title="Register Page" />
      <div className='p-3 max-w-lg mx-auto mt-48 md:mt-44'>
      <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          onChange={handleChange}
          className='bg-slate-100 p-3 rounded-lg'
          type="text"
          placeholder='Username'
          id='name' />
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
              Register
          </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500 '>Login</span>
        </Link>
      </div>
      </div>
    </>
  )
}

export default Register