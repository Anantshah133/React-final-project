import './App.css';
import './style.css'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import JobsGrid from './components/JobsGrid'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs-grid' element={<JobsGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
