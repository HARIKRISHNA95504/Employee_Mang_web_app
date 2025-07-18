

import React, { useState } from 'react';
import '../styles/employeeList.css'; 
import { useEffect } from 'react';
import { getAllEmployees,deleteEmployee } from '../services/employeeService';


const EmployeeList = () => {

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlZGhhQGdtYWlsLmNvbSIsIm51bWJlciI6IjQ1MzQ0MzIyMTEiLCJpYXQiOjE3NTIwNTk5OTYsImV4cCI6MTc1MjA2MzU5Nn0.aNcR5JNIJ58Oyaec00_8qWjV7lmkihY6WjacAHguYVg";
const [employees,setEmployees] = useState(null)
const [error, setError] = useState('');
const token = localStorage.getItem("token");
const fetchData = async()=>{
    try {
      const data = await getAllEmployees(token);
      console.log(data);
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err.response?.data || err.message);
      setError("Unauthorized or failed to fetch data.");
    }
}

useEffect(() => {
 fetchData();
},);


const handleDelete = async (id) => {
    await deleteEmployee(id);
    alert('Deleted Successfully')
    fetchData(); 
  };
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Employee List</h2>
      <div className="table-wrapper">
        <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.number}</td>
              <td>{emp.department?.name || 'N/A'}</td>
              <td className="actions">
                <button className="view" >View</button>
                <button className="edit" >Edit</button>
                <button className="delete" onClick={()=>handleDelete(emp._id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default EmployeeList;

