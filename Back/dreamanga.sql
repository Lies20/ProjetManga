DROP DATABASE IF EXISTS DreamangaDataBase;

CREATE DATABASE DreamangaDataBase;

CREATE TABLE IF NOT EXISTS DreamangaDataBase.User (
  idUser INT AUTO_INCREMENT,
  pseudo VARCHAR(20),
  birthday DATETIME NULL,
  email VARCHAR(45),
  password VARCHAR(255),
  PRIMARY KEY (idUser)
);

-- INSERT INTO DreamangaDataBase.User VALUES (NULL,'Morley','1992-08-13 00:04:37','mjimenez2@so-net.ne.jp','dsdsd');
-- INSERT INTO DreamangaDataBase.User VALUES (NULL,'Brnaby','1991-03-09 06:32:04','bwhales0@last.fm','oV4}G|KQ6V');
-- INSERT INTO DreamangaDataBase.User VALUES (NULL,'Brion','1996-05-22 22:55:11','bbatalini4@google.com.au','dY8$wV|_@O!KV8f');
-- INSERT INTO DreamangaDataBase.User VALUES (NULL,'Marve','1998-01-06 03:52:59','mdorton5@theguardian.com','rU0+V/?J');

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Post (
  idPost INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(200) NOT NULL,
  datePublication DATETIME NULL,
  idUser INT NOT NULL,
  PRIMARY KEY (idPost),
  INDEX idUser_idx (idUser),
  CONSTRAINT idUser
    FOREIGN KEY (idUser)
    REFERENCES DreamangaDataBase.User(idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Commentary (
  idCommentary INT NOT NULL AUTO_INCREMENT,
  subject VARCHAR(200) NULL,
  datePublication DATETIME NULL,
  idUser INT NULL,
  idPost INT NULL,
  role VARCHAR(15) NULL,
  isConnected TINYINT NULL,
  PRIMARY KEY (idCommentary),
  INDEX idPost_idx (idPost),
  INDEX idUser_idx (idUser),
  CONSTRAINT idPost
    FOREIGN KEY (idPost)
    REFERENCES DreamangaDataBase.Post (idPost),
  CONSTRAINT userId
    FOREIGN KEY (idUser)
    REFERENCES DreamangaDataBase.User (idUser)
);

CREATE TABLE IF NOT EXISTS DreamangaDataBase.Rubrique (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NomRubrique VARCHAR(255) NOT NULL,
  Description VARCHAR(1000),
  TypeManga VARCHAR(255) NOT NULL,
  idUser INT NOT NULL
);
