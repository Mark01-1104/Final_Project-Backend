var express = require('express');

var router = express.Router();

var dbConn = require('../../../config/db');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access PRIVATE
router.post('/NewStudent', (req, res) => {

    var Student_Id = req.body.Student_Id;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var MiddleName = req.body.MiddleName;
    var Strand = req.body.Strand;
    var YearLevel = req.body.YearLevel;
    var ContactNumber = req.body.ContactNumber;
    var Email = req.body.Email;
 
    sqlQuery = `INSERT INTO info__students(Student_Id, FirstName, LastName, MiddleName, Strand, YearLevel, ContactNumber, Email) VALUES (${Student_Id},"${FirstName}", "${LastName}", "${MiddleName}", "${Strand}", ${YearLevel}, ${ContactNumber}, "${Email}")`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/ViewInfo', (req, res) => {
    sqlQuery = "SELECT * FROM info__students";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/UpdateInfo', (req, res) => {
    var ID = req.body.ID;
    var Student_Id = req.body.Student_Id;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var MiddleName = req.body.MiddleName;
    var Strand = req.body.Strand;
    var YearLevel = req.body.YearLevel;
    var ContactNumber = req.body.ContactNumber;
    var Email = req.body.Email;


    sqlQuery = `UPDATE info__students SET Student_Id = ${Student_Id}, FirstName = "${FirstName}", LastName = "${LastName}" , MiddleName = "${MiddleName}", Strand = "${Strand}", YearLevel = ${YearLevel}, ContactNumber = ${ContactNumber}, Email = "${Email}" WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/DeleteUser', (req, res) => {
    var ID = req.body.ID;

    sqlQuery = `DELETE FROM info__students WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;