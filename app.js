const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

app.use(session({
    secret: '1234567890987654321',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


const authRoutes = require('./routes/auth');
const rootRoutes = require('./routes/root');
app.use('/', authRoutes);
app.use('/s', express.static(path.join(__dirname, 'public')));
app.use('/s', rootRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
