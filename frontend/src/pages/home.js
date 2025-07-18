import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; 
import Profile from '../assets/img.svg';
import Add from '../assets/add.svg';
import View from '../assets/view.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-container">
      <div className="home-card">
        <div className="home-left">
          <h1>Manage Your Workforce</h1>
          <p>
            A powerful and intuitive platform to add, view, and manage your employees effortlessly.
          </p>
          <div className="home-buttons">
            <button onClick={()=>navigate('/add-employee')}>
              <img src={Add}  alt="Add"/>
              Add Employee
            </button>
            <button onClick={()=>navigate('/employee-list')} >
              <img src={View} alt="View" />
              View Employees
            </button>
          </div>
        </div>

        <div className="home-right">
          <img src={Profile}  alt="Illustration" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
