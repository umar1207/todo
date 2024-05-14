const path = require('path');
const { authenticateUser, createUser, checkUser } = require('../database/queries');
const express = require('express');
const authRoute = express.Router();

authRoute.get('/', (req, res) => {
    const loginPath = path.join(__dirname, '..', 'views', 'auth', 'index.html');
    req.session.userId = null;
    res.sendFile(loginPath);
});

authRoute.post('/login', (req, res) => {
    const { email, password } = req.body;
    // if email and password are incorrect redirect to login page
    authenticateUser(email, password)
        .then((results) => {
            if (results.length === 0) {
                res.redirect('/');
                return Promise.reject('Invalid email or password');
            }
            // else redirect to the home page
            const user = results[0];
            console.log(req.session.userId);
            req.session.userId = user.id;
            console.log(req.session.userId);
            res.redirect('/s');
        })
        .catch((err) => {
            console.log(err);
            if (err !== 'Invalid email or password') {
                res.status(500).send('Internal Server Error');
            }
        });
});

authRoute.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // if password and confirmPassword do not match redirect to signup page
    if (password !== confirmPassword) {
        console.info('Passwords do not match');
        return res.redirect('/');
    }

    // if email already exists redirect to login page
    checkUser(email)
        .then((results) => {
            if (results.length > 0) {
                res.redirect('/');
                return Promise.reject('User already exists');
            }
            // else create a new user and redirect to the login pag
            return createUser(username, email, password);
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            if (err !== 'User already exists') {
                res.status(500).send('Internal Server Error');
            }
        });
});

module.exports = authRoute;