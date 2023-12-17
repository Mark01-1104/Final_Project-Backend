var express = require('express');

var router = express.Router();

var dbConn = require('../../../config/db');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access PRIVATE
router.post('/NewCouncelor', (req, res) => {

    var Councelor_Id = req.body.Councelor_Id;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var MiddleName = req.body.MiddleName;
    var ContactNumber = req.body.ContactNumber;
    var Email = req.body.Email;

    sqlQuery = `INSERT INTO info__councelor(Councelor_Id, FirstName, LastName, MiddleName, ContactNumber, Email) VALUES (${Councelor_Id},"${FirstName}", "${LastName}", "${MiddleName}", ${ContactNumber}, "${Email}")`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/ViewInfo', (req, res) => {
    sqlQuery = "SELECT * FROM info__councelor";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/UpdateInfo', (req, res) => {
    var ID = req.body.ID;
    var Councelor_Id = req.body.Councelor_Id;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var MiddleName = req.body.MiddleName;
    var ContactNumber = req.body.ContactNumber;
    var Email = req.body.Email;

    sqlQuery = `UPDATE info__councelor SET Councelor_Id = ${Councelor_Id}, FirstName = "${FirstName}", LastName = "${LastName}" , MiddleName = "${MiddleName}", ContactNumber = ${ContactNumber}, Email = "${Email}", WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/DeleteUser', (req, res) => {
    var ID = req.body.ID;

    sqlQuery = `DELETE FROM info__councelor WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;