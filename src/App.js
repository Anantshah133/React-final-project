import './App.css';
import './style.css'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import JobsGrid from './components/JobsGrid';
import Dashboard from './components/Dashboard';
import EditJob from './components/EditJob';
import AdminForm from './components/AdminForm';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const loginFlag = JSON.parse(localStorage.getItem("loginFlag")) || false;
    setIsLoggedIn(loginFlag);
  }, [isLoggedIn])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/jobs-grid' element={<JobsGrid />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editJob/:id' element={<EditJob />} />
        <Route path='/adminLogin' element={<AdminForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
