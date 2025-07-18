import React from 'react';
import EmployeeRegisterForm from '../components/registerForm';
import { registerEmp } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

const RegisterEmployee = () => {
  const navigate = useNavigate(); 

  const handleSubmit = async (formData) => {
    console.log('Submitting formData:', formData);
  try {
    await registerEmp(formData);
    alert('Registered Successfully!!')
    navigate('/');
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);
  }
  };

  return (
    <div>
      <h2>Register Employee</h2>
      <EmployeeRegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterEmployee;
