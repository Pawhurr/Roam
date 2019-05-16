DROP DATABASE IF EXISTS countries_db;

CREATE DATABASE countries_db;

USE countries_db;

CREATE TABLE countries
(
    id INT AUTO_INCREMENT,
    continent VARCHAR(100),
    country VARCHAR(100),
    bty TEXT,
    foods TEXT,
    religions TEXT,
    brief_history TEXT,
    facts TEXT,
    fun_fact TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    primary key (id)
    
    );