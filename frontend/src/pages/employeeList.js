import React, { useState, useEffect } from 'react';
import '../styles/employeeList.css';
import Modal from '../components/model'; // Ensure this path is correct
import { getDepartments,getAllEmployees, deleteEmployee, updateEmployee } from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token");

  // Modal & form states
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    department: ''
  });

  // Fetch all employees
  const fetchData = async () => {
    try {
      const [emps, deps] = await Promise.all([
        getAllEmployees(token),
        getDepartments(token)
      ]);
      setEmployees(emps);
      setDepartments(deps);
    } catch (err) {
      console.error("Error fetching employees:", err.response?.data || err.message);
      setError("Unauthorized or failed to fetch data.");
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Token not found. Please log in.");
      return;
    }
    fetchData();
  }, [token]);

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      alert('Deleted Successfully');
      fetchData();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed');
    }
  };

  // View
  const handleView = (emp) => {
    setSelectedEmployee(emp);
     console.log("Viewing employee details:", emp)
    setIsViewModalOpen(true);
  };

  // Edit
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      number: emp.number,
      department: emp.department?.name || ''
    });
    setIsEditModalOpen(true);
  };

  // Form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update
  const handleUpdate = async () => {
  try {
    console.log("Updating employee:", selectedEmployee._id, formData);
    await updateEmployee(selectedEmployee._id, formData,token);
    alert('Employee updated successfully');
    setIsEditModalOpen(false);
    fetchData();
  } catch (err) {
    console.error('Update failed:', err.response?.data || err.message);
    alert('Update failed');
  }
};

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
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
              {employees?.length === 0 ? (
                <tr>
                  <td colSpan="6">No employees found.</td>
                </tr>
              ) : (
                employees?.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.number}</td>
                    <td>{emp.department?.name || 'N/A'}</td>
                    <td className="actions">
                      <button className="view" onClick={() => handleView(emp)}>View</button>
                      <button className="edit" onClick={() => handleEdit(emp)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(emp._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal className="model-view" isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h3>Employee Details</h3>
        <p><strong>Name:</strong> {selectedEmployee?.name}</p>
        <p><strong>Email:</strong> {selectedEmployee?.email}</p>
        <p><strong>Phone:</strong> {selectedEmployee?.number}</p>
        <p><strong>Department:</strong> {selectedEmployee?.department?.name || 'N/A'}</p>
      </Modal>

      {/* Edit Modal */}
      <Modal className="model-edit" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h3>Edit Employee</h3>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="Phone" />
        <select name="department" value={formData.department} onChange={handleChange}>
          {formData.department ===''?(
            <option value="">Select Department</option>
          ):(
            <option value="">{formData.department}</option>
          )}
          {departments.map(dep => (
            <option key={dep._id} value={dep._id}>{dep.name}</option>
          ))}
        </select>
        <button onClick={handleUpdate}>Update</button>
      </Modal>
    </>
  );
};

export default EmployeeList;

