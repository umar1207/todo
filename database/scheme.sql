CREATE DATABASE IF NOT EXISTS todo_db;

USE todo_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- create a todo table with to-do-task and due-date 
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status enum('pending', 'completed') DEFAULT 'pending',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);