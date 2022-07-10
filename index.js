const app = require('express')();
const morgan = require('morgan');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(morgan('short'));

app.use(bodyParser.urlencoded({extended: false}))

const router = require('./routes/user');

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Admin@123',
        database: 'nodejs'
    });
}

app.use(router);

app.get('/', (req, res) => {
    res.send('Hello from ROOOT');
})


app.get('/user_json', (req, res) => {

    var userOne = {
        firstName: 'John',
        lastName: 'Doe',
    }

    var userTwo = {
        firstName: 'Mike',
        lastName: 'Tyson',
    }

    res.json([userOne, userTwo])
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})
