const express = require('express')

const db = require('./data/database');
const usersRoutes = require('./routes/users.routes');

const app = express()

app.use(express.json());

app.use('/users', usersRoutes);

app.use(function(error, req, res, next) {
    res.status(500).json({
        message: '오류발생',
    });
});

db.initDb()
    .then(function() {
        app.listen(3000);
    })
    .catch(function(error) {
        console.log('데이터베이스 연결 실패');
    });