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

--  Exemple de requete pour Inserer un User
INSERT INTO User (idUser,pseudo, birthday, email, password) VALUES (NULL,'NomUtilisateur', '1990-10-30', 'utilisateur@example.com', 'MotDePasseSecret');
-- INSERT INTO User (idUser,pseudo, birthday, email, password) VALUES (NULL,'NomUtilisar', '1990-10-30', 'utilisateur@example.com', 'MotDePasseSecr');

-- Exemple de request pour insert un post

INSERT INTO Post(idPost, title, description, datePublication,idUser) VALUES (NULL,"shonen","incroyable aventureeeee","2012-01-06",1);
-- INSERT INTO Post(idPost, title, description, datePublication,idUser) VALUES (NULL,"Haha","incroyable aventureeeee","2013-01-06",2);


-- CREATE TABLE IF NOT EXISTS DreamangaDataBase.Commentary (
--   idCommentary INT AUTO_INCREMENT PRIMARY KEY,
--   subject VARCHAR(200) NULL,
--   datePublication DATETIME NULL,
--   idUser INT,
--   idPost INT,
--   role VARCHAR(15) NULL,
--   isConnected TINYINT NULL,
--   INDEX idPost_idx (idPost),
--   INDEX idUser_idx (idUser),
--     CONSTRAINT fk_idPost FOREIGN KEY (idPost) REFERENCES User (idPost),
--     CONSTRAINT fk_idUser FOREIGN KEY (idUser) REFERENCES User (idUser),
--     FOREIGN KEY (idPost) REFERENCES DreamangaDataBase.Post (idPost),
--     FOREIGN KEY (idUser) REFERENCES DreamangaDataBase.User (idUser)
-- );

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


-- INSERT INTO Commentary(idCommentary, subject, datePublication, idUser,idPost,role,isConnected,) VALUES( NULL, "les shonen c'est pas top","2013-01-06 14:00:00",1,1,"lecteur",1)

INSERT INTO Commentary (subject, datePublication, idUser, idPost, role, isConnected) VALUES ('Sujet du commentaire',NULL, 1, 1, 'lecteur', 1);


CREATE TABLE IF NOT EXISTS DreamangaDataBase.Rubrique (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NomRubrique VARCHAR(255) NOT NULL,
  Description VARCHAR(1000),
  TypeManga VARCHAR(255) NOT NULL,
  idUser INT
);

INSERT INTO Rubrique (NomRubrique, Description, TypeManga, idUser) VALUES ('Shonen', 'Mangas pour jeunes garçons', 'Shonen', 1);

-- INSERT INTO Rubrique (NomRubrique, Description, TypeManga, idUser)
-- VALUES ('Shojo', 'Mangas pour jeunes filles', 'Shojo', 2);
