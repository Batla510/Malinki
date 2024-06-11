import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export default function Header({isAuth,setIsAuth,isAdmin,setIsAdmin,token,setToken}) {
    function logout(){
        fetch('http://127.0.0.1:8000/api-help/logout',{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        setIsAdmin(false)
        setIsAuth(false)
        setToken('')
    }
  return (
    <div>
        <header className="header">
            <div className="container">
                <Link to={'/'} className='header__logo'>
                    <img src={logo} alt='logo' className='header__img'/>
                </Link>
                <nav className="header__nav">
                    <ul className="header__menu">
                        {isAuth?
                        <>
                            {isAdmin?
                        <>
                            <li className="header__item">
                                <Link to={'/admin'} className='header__link'>Панель админа</Link>
                            </li>
                        </>:
                        <>
                            <li className="header__item">
                                <Link to={'/apps'} className='header__link'>Мои заявки</Link>
                            </li>
                            <li className="header__item">
                                <Link to={'/create'} className='header__link'>Создать заявку</Link>
                            </li>
                        </>}
                        <li className="header__item">
                                <Link to={'/'} className='header__link' onClick={logout}>Выход</Link>
                        </li>
                        </>:
                        <>
                            <li className="header__item">
                                <Link to={'/login'} className='header__link'>Вход</Link>
                            </li>
                            <li className="header__item">
                                <Link to={'/reg'} className='header__link'>Регистрация</Link>
                            </li>
                        </> 
                    }
                    </ul>
                </nav>
            </div>
        </header>
    </div>
  )
}
