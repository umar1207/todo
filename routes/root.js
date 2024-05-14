// routes/root.js 
const path = require('path');
const { addTask, editTask, deleteTask, getAllTodos , getTodayTodos, getSpecificTodos} = require('../database/queries');
const { generateTableHTML } = require('../utils/generate_table');
const fs = require('fs');

const express = require('express');
const router = express.Router();

const interPath = path.join(__dirname, '..', 'views', 'root');
// Define routes
router.get('/', (req, res) => {
    const indexPath = path.join(interPath, 'tasks.html');
    res.sendFile(indexPath);
});

router.get('/manage', (req, res) => {
    const insertPath = path.join(interPath, 'manage.html');
    res.sendFile(insertPath);
});

router.post('/add', (req, res) => {
    const task = req.body.task;
    const due_date = req.body.due_date;
    const user_id = req.session.userId;

    addTask(task, due_date, user_id)
        .then(() => {
            res.redirect('/s');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });

});

router.post('/edit', (req, res) => {
    const task = req.body.task;
    const due_date = req.body.due_date;
    const status = req.body.status;
    const user_id = req.session.userId;

    editTask(task, due_date, status, user_id)
        .then(() => {
            res.redirect('/s');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/delete', (req, res) => {
    const task = req.body.task;
    const user_id = req.session.userId;

    deleteTask(task, user_id)
        .then(() => {
            res.redirect('/s');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/viewAll', (req, res) => {
    const user_id = req.session.userId;
    getAllTodos(user_id)
        .then((results) => {
            const results_table = generateTableHTML(results);
            res.send(results_table);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/viewToday', (req, res) => {
    const user_id = req.session.userId;
    getTodayTodos(user_id)
        .then((results) => {
            const results_table = generateTableHTML(results);
            res.send(results_table);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/viewDueAt/:date', (req, res) => {
    const user_id = req.session.userId;
    const due_date = req.params.date;
    getSpecificTodos(user_id, due_date)
        .then((results) => {
            const results_table = generateTableHTML(results);
            res.send(results_table);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
