const express = require('express');
const jwt_token = require('jsonwebtoken');
const dbConn = require('../../config/db');

const router = express.Router();

router.get('/View/Request', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        res.status(401).json({ success: false, message: "Error, JWT token not found" });
        return;
    }
    
    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);
        var { Info } = decodedToken;

        var sqlQuery = "SELECT * FROM event__req";
    
        dbConn.con1.query(
            sqlQuery, 
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    res.status(401).json({ success: false, message: "Error, invalid JWT token" });
                    return;
                }
                console.log('Request was viewed', results);
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

router.put('/Update/Status', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        res.status(401).json({ success: false, message: "Error, JWT token not found" });
        return;
    }
    
    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass,process.env.Special_Token);
        var {
            Appointment_Id,
            Status
        } = req.body;

        var sqlQuery = `UPDATE event__req SET Status = "${Status}" WHERE Appointment_Id = ${Appointment_Id}`;

        dbConn.con1.query(
            sqlQuery, [Status, Appointment_Id],
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    res.status(500).json({ success: false, message: "Error, there was a problem with the database" });
                } else {
                    console.log('Status updated', results);
                    res.status(200).json(results);
                }
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});


module.exports = router;