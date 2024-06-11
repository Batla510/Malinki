import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registration() {
    const [login,setLogin] = useState('')
    const [email,setEmail] = useState('')
    const [fio,setFio] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState('')
    const navigate = useNavigate()

    function regis(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/api-help/signup',{
          method: 'POST',
          headers:{'Content-Type':'application/json'
          },
          body: JSON.stringify({login,password,phone,email,fio})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.data){
                navigate('/login')

            }else{
                setErrors(data.errors.message)
            }
        })
    }

  return (
    <section className='login'>
        <div className="container">
            <div className="login__wrap">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form">
                    <p className="error">{errors}</p>
                    <input type="text" className="login__input" placeholder='Login' value={login} onChange={event=>setLogin(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='fio' value={fio} onChange={event=>setFio(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='email' value={email} onChange={event=>setEmail(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='phone' value={phone} onChange={event=>setPhone(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='Password' value={password} onChange={event=>setPassword(event.target.value)}/>
                    <button className="login__btn" onClick={regis}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    </section>
  )
}
