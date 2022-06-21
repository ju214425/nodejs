const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function initDb() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('restapi');
}

function getDb() {
    if(!database) {
        throw new Error('데이터베이스 연결 오류');
    }

    return database;
}

module.exports = {
    initDb: initDb,
    getDb : getDb
}

