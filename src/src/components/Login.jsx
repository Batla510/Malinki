import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({setIsAuth,setToken,setIsAdmin}) {
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState('')
    const navigate = useNavigate()

    function log_in(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/api-help/login',{
          method: 'POST',
          headers:{'Content-Type':'application/json'
          },
          body: JSON.stringify({login,password})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.data){
                setToken(data.data.user_token)
                setIsAdmin(data.data.isAdmin)
                setIsAuth(true)
                if(data.data.isAdmin){
                    navigate('/admin')
                }else{
                    navigate('/apps')
                }
            }else{
                setErrors(data.error.message)
            }
        })
    }

  return (
    <section className='login'>
        <div className="container">
            <div className="login__wrap">
                <h2 className="login__title">Войти</h2>
                <form className="login__form">
                    <p className="error">{errors}</p>
                    <input type="text" className="login__input" placeholder='Login' value={login} onChange={event=>setLogin(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='Password' value={password} onChange={event=>setPassword(event.target.value)}/>
                    <button className="login__btn" onClick={log_in}>Войти</button>
                </form>
            </div>
        </div>
    </section>
  )
}
