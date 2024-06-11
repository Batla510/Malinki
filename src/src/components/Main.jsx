import React,{useEffect,useState} from 'react'

export default function Main() {
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