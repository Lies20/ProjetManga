-- DROP DATABASE IF EXISTS DreamangaDataBase;

-- CREATE DATABASE dreamanga_db;

USE dreamanga_db;

CREATE TABLE IF NOT EXISTS dreamanga_db.User (
  idUser INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(20) NOT NULL UNIQUE,
  birthday DATETIME NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
  

CREATE TABLE IF NOT EXISTS dreamanga_db.Post (
  idPost INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  datePublication DATE NOT NULL,
  idUser INT NOT NULL ,
  CONSTRAINT fk_idUser FOREIGN KEY (idUser) REFERENCES User (idUser)
);

CREATE TABLE IF NOT EXISTS dreamanga_db.Commentary (
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

-- salutsalut
INSERT INTO dreamanga_db.User
VALUES (NULL, 'lies', '1991-03-22', 'hocini.lies@gmail.com', '$2b$10$cV77Ii7E6tD4IzE88JAGYOxzweSvk7l1Ld2Yjo1/.1MBQUhHunsQi', 'admin');