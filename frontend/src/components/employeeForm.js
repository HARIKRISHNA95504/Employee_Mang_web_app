import React, { useEffect, useState} from 'react';
import '../styles/employeeForm.css';
import { getDepartments } from '../services/employeeService'; 

const AddEmployeeForm = ({ onSubmit}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    number: '',
    department: ''
  });

     
    const fetchDepartments = async () => {
        try {
          const data = await getDepartments();
          setDepartments(data || []);
        } catch (error) {
          console.error("Failed to fetch departments:", error);
          setDepartments([]); // fallback to empty array on error
        } finally {
          setLoading(false);
        }
      };

    useEffect(()=>{
      fetchDepartments()
    },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
 
  return (
    <div className="form-container">
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        <label htmlFor="email">Email<span className="required">*</span></label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required 
          placeholder="Enter email"
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <label htmlFor="address">Address</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
        />

        <label htmlFor="number">Phone Number</label>
        <input 
          type="text" 
          id="number" 
          name="number" 
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <label htmlFor="department">Department</label>
        <select 
          id="department" 
          name="department" 
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">{loading 
              ? "Loading departments..." 
              : departments.length === 0 
                ? "No departments available" 
                : "-- Select Department --"}
          </option>
          {!loading &&departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
