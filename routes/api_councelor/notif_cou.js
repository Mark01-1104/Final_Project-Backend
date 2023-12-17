var express = require('express');

var router = express.Router();

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/NewNotification', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }
    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var Student_Id = req.body.Student_Id;
        var Counselor_Id = req.body.Counselor_Id
        var Title = req.body.Title;
        var Content = req.body.Content;
        let Date_Created = new Date().toISOString();

        sqlQuery = `INSERT INTO event__notif(Student_Id, Counselor_Id, Title, Content, Date_Created) VALUES (?, ?, ?, ?, ?)`;
        dbConn.con1.query(sqlQuery, [Student_Id, Counselor_Id, Title, Content, Date_Created], function(error, results, fields){
            if (error) {
                console.log('Error executing query', error);
                throw error;
            }
            console.log('New event added', results);
            res.status(200).json(results);
        });
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

// SELECT or (VIEW)
router.get('/ViewNotification', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);
        var Student_Id = req.body.Student_Id;

        if (!Student_Id) {
            console.log('Student_Id not found in request query');
            return res.status(400).json({ success: false, message: "Error, Student_Id not found in request query" });
        }

        sqlQuery = `SELECT Student_Id, Title, Content, Date_Created FROM event__notif WHERE Student_Id = ${Student_Id}`;

        dbConn.con1.query(
            sqlQuery, 
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    throw error;
                }
                console.log('New event added', results);
                res.status(200).json(results[0]); 
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

module.exports = router;