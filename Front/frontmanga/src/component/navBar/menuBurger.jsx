import React from "react";
import { useUser } from "../../contexte/UserContext";
import { Link } from 'react-router-dom';
import "./menuBurger.css";

function Header() {
  const { user,logOut } = useUser();


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
        <Link to="/" className="active">Accueil</Link>
        {user && user.pseudo ? (
          <span className="pseudo">
            <p>Bienvenue, {user.pseudo} !</p>
            <span className="button">
            <button onClick={logOut} >Déconnexion</button>
            </span>
          </span>
          
        ) : (
          <>
            <Link to="/inscription">S'inscrire</Link>
            <Link to="/connexion">Connexion</Link>
          </>
        )}
        <a href="javascript:void(0);" className="icon" onClick={myFunction}>
          <i>///</i>
        </a>
      </div>
    </nav>
  );
}

export default Header;
