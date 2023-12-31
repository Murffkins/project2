const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

// Store mongo connection stuff in its own file
const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.PROJECT2_MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};




// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = {
//   url: process.env.MONGODB_URI,
// };