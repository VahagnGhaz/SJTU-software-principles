CREATE DATABASE IF NOT EXISTS xingqiao_database;
USE xingqiao_database;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO Users (email, password, username) VALUES
('vgn', '123', 'vahagn'),
('sim', '123', 'simon'),
('tyom', '123', 'tyom');

CREATE TABLE IF NOT EXISTS Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_date DATE NOT NULL,
    event_description TEXT,
    event_gallary VARCHAR(255),
    event_location VARCHAR(255) NOT NULL,
    event_time TIME NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    organizer_id INT,
	FOREIGN KEY (organizer_id) REFERENCES Users(id)
);

INSERT INTO Events (event_date, event_description, event_gallary, event_location, event_time, event_title, organizer_id) VALUES
('2023-07-15', 'An amazing event', 'https://ipinimg.com/236x/d8/b5/fa/d8b5fa332cc2458e0f89baf434573a23.jpg', 'Location 1', '14:30:00', 'Event 1', 1),
('2023-08-10', 'A fantastic event', 'https://ipinimg.com/236x/d8/b5/fa/d8b5fa332cc2458e0f89baf434573a23.jpg', 'Location 2', '18:00:00', 'Event 2', 1),
('2023-09-05', 'A superb event', 'https://ipinimg.com/236x/d8/b5/fa/d8b5fa332cc2458e0f89baf434573a23.jpg0', 'Location 3', '20:00:00', 'Event 3', 2);

CREATE TABLE IF NOT EXISTS Event_Participants (
    event_id INT,
    user_id INT,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Event_Participants (event_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 1),
(3, 3);

DROP TABLE IF EXISTS event_participants;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
