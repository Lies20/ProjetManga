import React from "react";
import { useUser } from "../../contexte/UserContext";
import { Link } from 'react-router-dom';
import "./menuBurger.css";

function Header() {
  const { user } = useUser();
  console.log('État de l utilisateur :', user);

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
          <p>Bienvenue, {user.pseudo} !</p>
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
