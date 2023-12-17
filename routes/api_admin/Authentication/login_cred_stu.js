var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var dbConn = require('../../../config/db');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access PRIVATE
router.post('/Student_Cred', async (req, res) => {

    var salt_rounds = 10;

    var Student_Id = req.body.Student_Id;
    var Username = req.body.Username;
    var Password = req.body.Password;
    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `INSERT INTO login__cred_stu(Student_Id,Username,Password) VALUES (${Student_Id},"${Username}","${hash_password}")`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        res.status(200).json(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// SELECT or (VIEW)
router.get('/View_Cred', (req, res) => {
    sqlQuery = "SELECT * FROM login__cred_stu";

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        console.log(results);
        if (error) throw error;
        res.status(200).json(results);
    });
});

// UPDATE
router.put('/Update_Cred', async (req, res) => {
    var ID = req.body.ID;
    var Student_Id = req.body.Student_Id;
    var Username = req.body.Username;
    var Password = req.body.Password;

    const salt_rounds = 10;
    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `UPDATE login__cred_stu SET Student_Id = ${Student_Id}, Username = "${Username}", Password = "${hash_password}" WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

// DELETE
router.delete('/Delete_Cred', (req, res) => {
    var ID = req.body.ID;

    sqlQuery = `DELETE FROM login__cred_stu WHERE ID = ${ID}`

    dbConn.con1.query(sqlQuery, function(error, results, fields){
        if (error) throw error;
        res.status(200).json(results);
    });
});

module.exports = router;