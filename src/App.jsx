import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (formData.password !== formData.cpassword) {
      setError('Password and Confirm password must be the same');
      return;
    }
    if (!/[$#@!&]/.test(formData.password)) {
      setError('Password must contain at least one special character ("$#@!&")');
      return;
    }

    setUsers((prev) => [...prev, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }]);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      cpassword: '',
    });

    toast.success('Sign-up Successfully! ✅', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={submitHandler} className='flex flex-col gap-3'>
          <input
            required
            value={formData.name}
            name="name"
            onChange={handleChanges}
            className="w-full border-2 border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type='text'
            placeholder='Enter Name here'
          />
          <input
            required
            value={formData.email}
            name="email"
            onChange={handleChanges}
            className="w-full border-2 border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type='email'
            placeholder='Enter Your Email'
          />
          <input
            required
            value={formData.password}
            name="password"
            onChange={handleChanges}
            className="w-full border-2 border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type='password'
            placeholder='Enter Password'
          />
          <input
            required
            value={formData.cpassword}
            name="cpassword"
            onChange={handleChanges}
            className="w-full border-2 border-gray-300 px-4 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type='password'
            placeholder='Confirm Password'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button className='text-lg text-white px-4 py-2 rounded bg-emerald-600 font-semibold mt-4 w-full hover:bg-emerald-700 transition'>Submit</button>
        </form>

        <ToastContainer />

      </div>
     
    </div>
  );
};

export default App;