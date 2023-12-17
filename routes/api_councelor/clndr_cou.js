var express = require('express');

var router = express.Router();

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/NewEvent', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var {
            Student_Id,
            Counselor_Id,
            Title,
            Start_Date,
            End_Date,
            Time,
        } = req.body;

        var sqlQuery = `INSERT INTO event__cldr (Student_Id, Counselor_Id, Title, Start_Date, End_Date, Time) VALUES (?, ?, ?, ?, ?, ?)`;

        dbConn.con1.query(
            sqlQuery, [Student_Id, Counselor_Id, Title, Start_Date, End_Date, Time],
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
                }
                console.log('New event added', results);
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

router.get('/ViewEvent', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var sqlQuery = "SELECT Student_Id, Title, Start_Date, End_Date, Time FROM event__cldr";

        dbConn.con1.query(
            sqlQuery, 
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
                }
                console.log('New event added', results);
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

router.put('/UpdateEvent', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var Calendar_ID = req.body.Calendar_ID;
        var Student_Id = req.body.Student_Id;
        var Title = req.body.Title;
        var Start_Date = req.body.Start_Date;
        var End_Date = req.body.End_Date;
        var Time = req.body.Time;

        sqlQuery = `UPDATE event__cldr SET Student_Id = ${Student_Id}, Title = "${Title}", Start_Date = "${Start_Date}", End_Date = "${End_Date}" , Time = "${Time}" WHERE Calendar_ID = ${Calendar_ID}`

        dbConn.con1.query(sqlQuery, function(error, results, fields){
            if (error) {
                console.log('Error executing query', error);
                return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

router.delete('/DeleteEvent', (req, res) => {

    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);

        var Calendar_ID = req.body.Calendar_ID;

        sqlQuery = `DELETE FROM event__cldr WHERE Calendar_ID = ${Calendar_ID}`

        dbConn.con1.query(sqlQuery, function(error, results, fields){
            if (error) {
                console.log('Error executing query', error);
                return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

module.exports = router;