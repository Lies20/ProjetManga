import React from "react";
import { useUser } from "../../contexte/UserContext";
import { Link } from 'react-router-dom';
import "./menuBurger.css";

function Header() {
  const { user, logOut } = useUser();

  return (
    <nav>
      <div className="topnav">
        <div className="logo-container">
          <Link to="/">
            <img src='../img/logo.png' alt="Dreamanga Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-options">
          {user && user.pseudo ? (
            <span className="pseudo">
              <p>Bienvenue, {user.pseudo} !</p>
              <span className="button">
                <button className="logOut" onClick={logOut} >Déconnexion</button>
              </span>
            </span>
          ) : (
              <>
                <Link to="/inscription">Inscription</Link>
                <Link to="/connexion">Connexion</Link>
              </>
          )}
          <a href="#menu-toggle" className="icon">
            <i>///</i>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
