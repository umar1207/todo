const db = require('./connection');

function authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function createUser(username, email, password) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function checkUser(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function addTask(task, due_date, user_id) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO todos (task, due_date, user_id) VALUES (?, ?, ?)', [task, due_date, user_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function editTask(task, due_date, status, user_id){
    let query = 'UPDATE todos SET';
    if(due_date) query += ` due_date = '${due_date},'`;
    if(status) query += ` status = '${status}'`;
    query += ` WHERE user_id = ${user_id}`;
    query += ` AND task = '${task}'`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
}

function deleteTask(task, user_id){
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM todos WHERE user_id = ? AND task = ?', [user_id, task], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
}

function getAllTodos(user_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM todos WHERE user_id = ?', [user_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function getTodayTodos(user_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM todos WHERE user_id = ? AND due_date = CURDATE()', [user_id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

function getSpecificTodos(user_id, due_date) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM todos WHERE user_id = ? AND due_date = ?', [user_id, due_date], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

module.exports = { getAllTodos, getTodayTodos, getSpecificTodos, authenticateUser, createUser, checkUser, addTask , editTask, deleteTask};