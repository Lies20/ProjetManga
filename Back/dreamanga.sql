DROP DATABASE IF EXISTS DreamangaDataBase;

CREATE DATABASE DreamangaDataBase;

CREATE TABLE IF NOT EXISTS DreamangaDataBase.User (
  idUser INT NOT NULL AUTO_INCREMENT,
  pseudo VARCHAR(20) NULL,
  birthday DATE NULL,
  email VARCHAR(45) NULL,
  password VARCHAR(200) NULL,
  PRIMARY KEY (idUser)
);

INSERT INTO DreamangaDataBase.User VALUE(1,"bobom",2000-04-23,"jesuisunemerde","boumboum");

CREATE TABLE IF NOT EXISTS `DreamangaDataBase`.`Post` (
  `idPost` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `datePublication` DATETIME NULL,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`idPost`),
  INDEX `idUser_idx` (`idUser` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `DreamangaDataBase`.`User` (`idUser`)
);

CREATE TABLE IF NOT EXISTS `DreamangaDataBase`.`Commentary` (
  `idCommentary` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(200) NULL,
  `datePublication` DATETIME NULL,
  `idUser` INT NULL,
  `idPost` INT NULL,
  `role` VARCHAR(15) NULL,
  `isConnected` TINYINT NULL,
  PRIMARY KEY (`idCommentary`),
  INDEX `idPost_idx` (`idPost`),
  INDEX `idUser_idx` (`idUser`),
  CONSTRAINT `idPost`
    FOREIGN KEY (`idPost`)
    REFERENCES `DreamangaDataBase`.`Post` (`idPost`),
  CONSTRAINT `userId`
    FOREIGN KEY (`idUser`)
    REFERENCES `DreamangaDataBase`.`User` (`idUser`)
);

CREATE TABLE IF NOT EXISTS `DreamangaDataBase`.`Rubrique` (
  `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `NomRubrique` VARCHAR(255) NOT NULL,
  `Description` VARCHAR(1000),
  `TypeManga` VARCHAR(255) NOT NULL,
  `idUser` INT NOT NULL
);
