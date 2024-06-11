import React,{useState,useEffect} from 'react'

export default function AdminPanel({token}) {
  const [apps,setApps] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api-help/claims',{
      method: 'GET',
      headers:{'Content-Type':'application/json'
      }
    })
    .then(data=>data.json())
    .then(data=>setApps(data.data))
  },[])

  function delApp(id){
    fetch(`http://127.0.0.1:8000/api-help/admin/${id}`,{
      method: 'DELETE',
      headers:{'Content-Type':'application/json',
              'Authorixation':`Bearer ${token}`
      }
    })
    setApps(apps.filter(app=>app.id !== id))
  }

  function changeStatus(status,id){
    fetch(`http://127.0.0.1:8000/api-help/admin/${id}`,{
      method: 'PATCH',
      headers:{'Content-Type':'application/json',
              'Authorixation':`Bearer ${token}`
      },
      body: JSON.stringify({status})
    })
  
    setApps(apps.map(app=>{
      if(app.id===id){
        return{...app,status:(status === 2 ? 'agree':'reject')}
      }else{
        return app
      }
    }))
  }

  const printApps = apps.map((app)=>{
    return(
      <div className="main__card" key={app.id}>
        <div className="main__wrap">
          <h4 className="main__number">{app.auto_num}</h4>
          <p className="main__status">Статус: {app.status}</p>
        </div>
        <p className="main__text">
          {app.description}
        </p>
        <div className="main__change">
          <button className='main__btn' onClick={()=>changeStatus(2,app.id)}>Agree</button>
          <button className='main__btn' onClick={()=>changeStatus(3,app.id)}>Reject</button>
        </div>
        <button className="login__btn" onClick={()=>delApp(app.id)}>Удалить</button>
      </div>
    )
  })
  return (
    <selection className="main">
      <div className="container">
        <div className="main__row">
          {printApps}
        </div>
      </div>
    </selection>
  )
}