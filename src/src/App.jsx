import './assets/css/style.css'
import './App.css'
import React,{useState} from 'react';
import {Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';
import Applications from './components/Applications';
import AdminPanel from './components/AdminPanel';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  const [isAuth,setIsAuth] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const [token,setToken] = useState('')


  return (
    <>
    <Header isAuth={isAuth} setIsAuth={setIsAuth} isAdmin={isAdmin} setIsAdmin={setIsAdmin} token={token} setToken={setToken}/>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/login' element={<Login setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} setToken={setToken}/>} />
      <Route path='/reg' element={<Registration/>} />
      <Route path='/apps' element={<Applications token={token}/>} />
      <Route path='/admin' element={<AdminPanel token={token}/>} />
      <Route path='/create' element={<ApplicationForm token={token}/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
