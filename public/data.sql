CREATE DATABASE AdvancedEventsDB;
USE AdvancedEventsDB;

CREATE TABLE Experts (
    id INT PRIMARY KEY ,
    nomExp VARCHAR(100) ,
    prenomExp VARCHAR(100) ,
    telExp int ,
    specialiteExp VARCHAR(100) ,
    EmailExp VARCHAR(100) 
);

CREATE TABLE Evenements (
    id INT PRIMARY KEY ,
    theme VARCHAR(100) ,
    date_debut DATE ,
    date_fin DATE ,
    descriptionEvt TEXT ,
    cout_journalier VARCHAR(40),
    FOREIGN KEY (idExp) REFERENCES Experts(id)
);

CREATE TABLE ateliers (
    id INT PRIMARY KEY ,
    nomAtelier VARCHAR(50),
    descriptionAtelier TEXT ,
    FOREIGN KEY (idEvt) REFERENCES Evenements(id)
);

CREATE TABLE participants (
    id INT PRIMARY KEY ,
    nomPart VARCHAR(100) ,
    prenomPart VARCHAR(100) ,
    sexePart VARCHAR(10) ,
    telPart INT ,
    EmailPart VARCHAR(100) 
);

CREATE TABLE inscriptions (
    id INT PRIMARY KEY ,
    dateInscription DATE ,
    statutPaiement VARCHAR(50),
    FOREIGN KEY (idPart) REFERENCES participants(id),
    FOREIGN KEY (idEvent) REFERENCES Evenements(id)
);

INSERT into Experts (id, nomExp, prenomExp, telExp, specialiteExp, EmailExp) VALUES
(1, 'Dupont', 'Jean', 1234567890, 'Informatique', 'dupontasil@gmail.com'),
(2, 'Martin', 'Sophie', 2345678901, 'Gestion de projet', 'martinkluivert@gmail.com')

INSERT into Evenements (id, theme, date_debut, date_fin, descriptionEvt, cout_journalier, idExp) VALUES
(1, 'Atelier SQL Avancé', '2024-07-01', '2024-07-05', 'Un atelier approfondi sur les techniques avancées de SQL.', '150', 1),
(2, 'Gestion de Projet Agile', '2024-08-10', '2024-08-15', 'Apprenez les principes et pratiques de la gestion de projet agile.', '200', 2);

INSERT INTO ateliers (id, nomAtelier, descriptionAtelier, idEvt) VALUES
(1, 'Optimisation des requêtes SQL', 'Techniques pour optimiser les performances des requêtes SQL.', 1),
(2, 'Introduction à Scrum', 'Les bases de la méthodologie Scrum pour la gestion de projet.', 2);

INSERT INTO participants (id, nomPart, prenomPart, sexePart, telPart, EmailPart) VALUES
(1, 'Leroy', 'Marie', 'Femme', 3456789012, 'lerpybale@gmail.com'),
(2, 'Bernard', 'Paul', 'Homme', 4567890123, 'bernardsilva@gmail.com');

INSERT INTO inscriptions (id, dateInscription, statutPaiement, idPart, idEvent) VALUES
(1, '2024-06-15', 'Payé', 1, 1),
(2, '2024-06-20', 'En attente', 2, 2);



DELIMITER $$

CREATE PROCEDURE InsertEvent (
    IN p_theme VARCHAR(100),
    IN p_date_debut DATE,
    IN p_date_fin DATE,
    IN p_description TEXT,
    IN p_cout VARCHAR(40),
    IN p_idExp INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM Experts WHERE id = p_idExp) THEN
        INSERT INTO Evenements (theme, date_debut, date_fin, descriptionEvt, cout_journalier, idExp)
        VALUES (p_theme, p_date_debut, p_date_fin, p_description, p_cout, p_idExp);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erreur : L''expert spécifié n''existe pas.';
    END IF;
END $$

DELIMITER ;


DELIMITER //

CREATE fonction coutTotal (nomExpert VARCHAR(100) prenomExpert VARCHAR(100)) 
RETURNS DECIMAL(10,2)
DETERMINISTIC 
BEGIN
    DECLARE totalCout DECIMAL(10,2);
    SELECT SUM(CAST(cout_journalier AS DECIMAL(10,2)) * DATEDIFF(date_fin, date_debut) + 1) FROM Evenements e
    JOIN Experts ex ON e.idExp = ex.id
    WHERE ex.nomExp = nomExpert AND ex.prenomExp = prenomExpert;
    RETURN totalCout;

    IF totalCout IS NULL THEN
        SET total = 0;
    END IF;

    RETURN total;

END //;

DELIMITER ;

