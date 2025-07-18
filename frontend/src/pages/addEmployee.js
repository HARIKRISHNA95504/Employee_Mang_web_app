import React from 'react';
import EmployeeForm from '../components/employeeForm';
import { addEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await addEmployee(formData);
    navigate('/employee-list');
  };
  

  return (
    <div>
      <h2>Add New Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEmployee;
