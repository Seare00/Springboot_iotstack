-- MySQL
-- Tabell
drop database if exists sensors;
create database sensors;

USE sensors;

CREATE TABLE temperature (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    temp FLOAT NOT NULL,
    datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Information för kopplingen mellan python script och sql.
drop user arduino;
CREATE USER 'arduino'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sensors.temperature TO 'arduino'@'%';


-- POSTGRESQL

sudo -i -u postgres
psql

CREATE USER arduino WITH PASSWORD 'password';
CREATE DATABASE sensors;
GRANT ALL PRIVILEGES ON DATABASE sensors TO arduino;
\q

psql -U arduino -d sensors

CREATE TABLE temperature (
    id SERIAL PRIMARY KEY,
    temp FLOAT NOT NULL,
    datum TIMESTAMP(0) DEFAULT NOW(),
    plats VARCHAR(50) NOT NULL
);

