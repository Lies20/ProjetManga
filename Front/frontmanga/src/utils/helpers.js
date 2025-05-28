// Fonctions utilitaires pour l'application

export const isEmailValid = (email) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export const reduceText = (text, wordLimit = 30) => {
  const words = text.split(/\s+/);
  const limitedWords = words.slice(0, wordLimit);
  return limitedWords.join(' ');
}