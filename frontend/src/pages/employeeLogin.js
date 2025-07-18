import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/employeeLogin.css';
import { loginEmployee } from '../services/employeeService';

const EmployeeLogin = () => {
  const [emailOrNumber, setEmailOrNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
   const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    setError('');
    try{
      const accessToken = await loginEmployee({emailOrNumber,password})
      localStorage.setItem('token', accessToken);
      navigate('/');
    }catch(error){
      console.error('Login failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
    console.log('Email:', emailOrNumber, 'Password:', password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Employee Login</h2>
        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={emailOrNumber}
          onChange={(e) => setEmailOrNumber(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p >Register Here...? <Link className='register-link'  to='/employee-register' >Register</Link></p>
      </form>
    </div>
  );
};

export default EmployeeLogin;
