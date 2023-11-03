import React from "react";
import "../Navbar/menuBurger.css"

function Header() {
  const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  return (
    <nav>
      <div className="topnav" id="myTopnav">
        <a href="#home" className="active">
        </a>
        <a href="#S'inscrire">S'inscrire</a>
        <a href="#Connexion">Connexion</a>
        <a href="#Accueil">Accueil</a>
        <a href="javascript:void(0);" className="icon" onClick={myFunction}>
          <i>///</i>
        </a>
      </div>
      </nav>
  );
}

export default Header;