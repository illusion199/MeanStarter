//include modules and connecting mongodb
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
 return MongoClient.connect('mongodb://localhost:27017/meanstack', (err, db) => {
    if(err){
        return console.log(err);
    }
    closure(db);
 });
}

let response = {
    status: 200,
    message: null,
    data: []
}

// error handeler 
var sendError = (err, res) => {
    res.status = 501,
    res.message = typeof err == "object" ? err.message: err;
    res.status(501).json(response);
}

router.get('/students', (req, res) => {
    connection((db) => {
        db.collection('students').find().toArray().then((students) => {
            response.data = students;
            res.json(response);
        })
    })
})
module.exports = router;