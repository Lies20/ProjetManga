DROP DATABASE IF EXISTS DreamangaDataBase;

CREATE DATABASE DreamangaDataBase;

USE DreamangaDataBase;

CREATE TABLE IF NOT EXISTS DreamangaDataBase.User (
  idUser INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(20),
  birthday DATETIME NULL,
  email VARCHAR(45),
  password VARCHAR(255)
);
  

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Post (
  idPost INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(200) NOT NULL,
  datePublication DATE NULL,
  idUser INT,
  CONSTRAINT fk_idUser FOREIGN KEY (idUser) REFERENCES User (idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Commentary (
  idCommentary INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(200) NULL,
  datePublication DATETIME NULL,
  idUser INT,
  idPost INT,
  role VARCHAR(15) NULL,
  isConnected TINYINT NULL,
  INDEX idPost_idx (idPost),
  INDEX idUser_idx (idUser),
  CONSTRAINT fk_idPost FOREIGN KEY (idPost) REFERENCES Post (idPost),
  CONSTRAINT fk_idUser_Commentary FOREIGN KEY (idUser) REFERENCES User (idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Rubrique (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NomRubrique VARCHAR(255) NOT NULL,
  Description VARCHAR(1000),
  TypeManga VARCHAR(255) NOT NULL,
  idUser INT
);

