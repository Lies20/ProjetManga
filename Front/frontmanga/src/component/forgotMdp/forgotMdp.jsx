import React, { useState } from "react";
import './forgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Mot de passe oublié</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="forgot-form">
            <p>Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.</p>
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Envoyer</button>
          </form>
        ) : (
          <p className="success-message">
            Si cette adresse existe, un e-mail de réinitialisation a été envoyé.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
