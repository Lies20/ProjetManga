import './adminPage.css'
import BurgerMenu from "../navBar/menuBurger"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from "../../contexte/UserContext";
import { useNavigate } from 'react-router-dom';

export default function adminPage(){
    const [info, setInfo] = useState({})
    const {user} = useUser()
    const navigate = useNavigate()
    
    const fetchInfo = async ()=>{
        const req = await axios.get('https://projetmanga-backend.onrender.com/api/admin/infos',  {
            headers:{
                Authorization: `Bearer ${user.token}`
                // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNDIwOTU1MSwiZXhwIjoxNzA0MjEzMTUxfQ.ByqpXz6dmDk2wUdBamA5y-TVunT10vuELDdCyi7wWFU'
            }
          }
          )
       setInfo(req.data)
    }
    
    useEffect(()=>{
        if(!user || user.role !== 'admin'){
            navigate('/')
        }
        fetchInfo()
    }, [])
    
    return(
        <>
        <BurgerMenu/>
        <div className="admin">
        <div className="welcome-admin">
            <div className="message">
            <p>Salut, tu es connecté en tant qu'<span className='admin-color'> administrateur </span></p>
            </div>
            <img src="/img/luffy.jpg" />
        </div>
        <div className="info-posts">
            <div className="card">
                <p className="card-title">
                    Nombre de posts
                </p>
                <p className="card-info">{info?.posts?.length}</p>
            </div>
            <div className="card">
                <p className="card-title">
                    Nombre d'utilisateurs
                </p>
                <p className="card-info">{info?.users?.length}</p>
            </div>
        </div>
        <div className="info-users">
            <p className="card-title">Top des utilisateurs</p>
            <ul>
                {info?.topUsers?.map(user=>{
                   return  <li key={user.pseudo}>{user.pseudo} ( {user.nombreDePosts} )</li>
                })}
            </ul>
        </div>
        </div>
        </>
    )
}