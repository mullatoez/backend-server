const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/messages', (req, res) => {
    res.send('Hello from users');
    res.end();
})

router.get('/user/:id', (req, res) => {
    console.log('Trying to fetch user with id ' + req.params.id);

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Admin@123',
        database: 'nodejs'
    });

    const userId = req.params.id;

    const queryString = 'SELECT * FROM user WHERE id = ?';

    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.sendStatus(500);
            return;
        }

        res.json(rows)
    })

    //res.end()
})

router.get('/users', (req, res) => {

    const connection = getConnection();

    const queryString = 'SELECT * FROM user';

    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.sendStatus(500);
            return;
        }

        res.json(rows)
    })
})

router.post('/user_create', (req, res) => {
    console.log('Trying to create a new user');

    const firstName = req.body.fname;
    const lastName = req.body.lname;

    const connection = getConnection();

    const queryString = 'insert into user (firstName, lastName) values (?, ?)';

    connection.query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log(`Error ${err}`);
            res.sendStatus(500);
            return;
        }

        console.log(`Inserted ${results.affectedRows} rows`);
    })
    res.end();
})


//functions

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'nodejs'
}
);

function getConnection() {
    return pool;
}


module.exports = router;