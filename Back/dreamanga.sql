DROP DATABASE IF EXISTS DreamangaDataBase;

CREATE DATABASE DreamangaDataBase;

USE DreamangaDataBase;

CREATE TABLE IF NOT EXISTS DreamangaDataBase.User (
  idUser INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(20) NOT NULL UNIQUE,
  birthday DATETIME NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
  

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Post (
  idPost INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  datePublication DATE NOT NULL,
  idUser INT NOT NULL ,
  CONSTRAINT fk_idUser FOREIGN KEY (idUser) REFERENCES User (idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Commentary (
  idCommentary INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(1000) NOT NULL ,
  datePublication DATETIME NOT NULL ,
  idUser INT NOT NULL ,
  idPost INT NOT NULL ,
  INDEX idPost_idx (idPost),
  INDEX idUser_idx (idUser),
  CONSTRAINT fk_idPost FOREIGN KEY (idPost) REFERENCES Post (idPost),
  CONSTRAINT fk_idUser_Commentary FOREIGN KEY (idUser) REFERENCES User (idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Rubrique (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NomRubrique VARCHAR(255) UNIQUE NOT NULL,
  Description VARCHAR(1000)
);


-- Lies93@simplon
INSERT INTO DreamangaDataBase.User
VALUES (NULL, 'lies', '1991-03-22', 'hocini.lies@gmail.com', '$2y$10$uuF.XfGqZ2gHwAeVFxUfUe/wey4vBtQ.me8D.bDfVtbCRLGHE7LRq', 'admin');