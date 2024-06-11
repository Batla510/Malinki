import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function ApplicationForm({tokrn}) {
    const [name,setName] = useState('')
    const [autoNum,setAutoNum] = useState('')
    const [description,setDescription] = useState('')
    const [errors,setErrors] = useState('')
    const navigate = useNavigate()

    function createApp(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/api-help/claim',{
          method: 'POST',
          headers:{'Content-Type':'application/json'
          },
          body: JSON.stringify({name,auto_num:autoNum,description})
        })
        .then(data=>data.json())
        .then(data=>{
           if(data.error){
            setErrors(data.error.message)
           }
        })
        navigate('/apps')
    }

  return (
    <section className='login'>
        <div className="container">
            <div className="login__wrap">
                <h2 className="login__title">Добавить заявку</h2>
                <form className="login__form">
                    <p className="error">{errors}</p>
                    <input type="text" className="login__input" placeholder='Name' value={name} onChange={event=>setName(event.target.value)}/>
                    <input type="text" className="login__input" placeholder='Auto number' value={autoNum} onChange={event=>setAutoNum(event.target.value)}/>
                    <textarea className="login__input" placeholder='Your app..' rows="5" onChange={event=>setDescription(event.target.value)}>{description}</textarea>
                    <button className="login__btn" onClick={createApp}>Создать</button>
                </form>
            </div>
        </div>
    </section>
  )
}