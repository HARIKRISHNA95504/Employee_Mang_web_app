import axios from 'axios'
const BASE_URL = 'http://localhost:4000/employees'
const DEPT_BASE_URL = 'http://localhost:4000/departments'




export const getAllEmployees = async(token)=>{
    const response = await axios.get(BASE_URL,{
      headers:{Authorization:`Bearer ${token}`}
    });
    return response.data.data
};

export const getEmployeeById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data.data;
};

export const addEmployee = async (employee) => {
  return await axios.post(`${BASE_URL}/register`, employee);
};

// register
export const registerEmp = async(formData)=>{
  return await axios.post(`${BASE_URL}/register`,formData,{
    headers: {
      'Content-Type': 'application/json',
    },
  })
};


export const deleteEmployee = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};


export const loginEmployee = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials);
  return res.data.accesstoken;
};

export const getDepartments = async(token)=>{
    const response = await axios.get(DEPT_BASE_URL,{
      headers:{Authorization:`Bearer ${token}`}
    });
    return response.data.data
};



// actions
// Update employee
export const updateEmployee = async (id, data,token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`  // ✅ FIXED: no nested headers
    }
  });
  return res.data;
};
