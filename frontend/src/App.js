import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import EmployeeLogin from './pages/employeeLogin';
import EmployeeRegister from './pages/employeeRegister'
import Home from './pages/home'
import AddEmployee from './pages/addEmployee'
import EmployeeList from './pages/employeeList';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<EmployeeLogin/>}/>
          <Route path='/employee-register' element={<EmployeeRegister/>}/>
          <Route path='/add-employee' element={<AddEmployee/>}/>
          <Route path='/employee-list' element={<EmployeeList/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
