import React, { useState } from "react";
import { useUser } from "../../contexte/UserContext";
import { Link, useNavigate } from 'react-router-dom';
import "./menuBurger.css";

function Header() {
  const { user, logOut } = useUser();
  const [burger, setBurger] = useState(true)
  const navigate = useNavigate()
  
  const dashboard = ()=>{
    navigate('/admin')
  }
  
  return (
    <nav>
      <div className="topnav">
        <div className="logo-container">
          <Link to="/">
            <img src='../img/logo.png' alt="Dreamanga Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-options">
          <div className="desktop-navbar">
          {user && user.pseudo ? (
            <span className="pseudo">
              <p>Bienvenue, {user.pseudo} !</p>
              <span className="button">
                <div className="menu-buttons">
                  <Link to="/compte" className="compte-link">Mon compte</Link>
                  {user.role === "admin" ? (
                    <button className="dashboard-btn" onClick={dashboard}>Dashboard</button>
                  )
                  : null}
                  <button className="logOut" onClick={logOut} >Déconnexion</button>
                 </div>
              </span>
            </span>
          ) : (
            <>
                <Link to="/inscription"> Inscription</Link>
                <Link to="/connexion">Connexion</Link>
              </>
          )}
          </div>
          <a href="#menu-toggle" onClick={()=>{setBurger(!burger)}} className="icon">
            <i>///</i>
          </a>
        </div>
      </div>
          {
            burger && (
              <div className="mobile-navbar">
              {user && user.pseudo ? (
                <span className="pseudo">
                  <p>Bienvenue, {user.pseudo} !</p>
                  <span className="button">
                  <div className="menu-buttons">
                    <Link to="/compte" className="compte-link">Mon compte</Link>
                    {user.role === "admin" ? (
                      <button className="dashboard-btn" onClick={dashboard}>Dashboard</button>
                    )
                    : null}
                    <button className="logOut" onClick={logOut} >Déconnexion</button>
                 </div>
                   
                  </span>
                </span>
              ) : (
                <>
                    <Link to="/inscription">Inscription</Link>
                    <Link to="/connexion">Connexion</Link>
                  </>
              )}
              </div>
            )
          }
    </nav>
  );
}

export default Header;