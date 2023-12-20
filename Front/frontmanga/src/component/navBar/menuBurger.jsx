import React from "react";
import { useUser } from "../../contexte/UserContext";
import { Link } from 'react-router-dom';
import "./menuBurger.css";

function Header() {
  const { user, logOut } = useUser();

  const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  return (
      <nav>
        <div className="topnav" id="myTopnav">
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
                    <button onClick={logOut} >Déconnexion</button>
                  </span>
            </span>
            ) : (
                <>
                  <Link to="/inscription">Inscription</Link>
                  <Link to="/connexion">Connexion</Link>
                </>
            )}
            <a href="javascript:void(0);" className="icon" onClick={myFunction}>
              <i>///</i>
            </a>
          </div>
        </div>
      </nav>
  );
}

export default Header;
