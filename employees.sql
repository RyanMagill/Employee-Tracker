-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS employees_db;
-- Creates the "animals_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect animals_db --
USE employees_db;

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

-- Creates the table "people" within animals_db --
CREATE TABLE employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE departments(
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

INSERT INTO roles(title, salary, department_id) VALUES ("Manager", 100000, 1); 
INSERT INTO roles(title, salary, department_id) VALUES ("Employee", 90000, 1); 
