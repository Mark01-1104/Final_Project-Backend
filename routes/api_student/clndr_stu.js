const express = require('express');
const router = express.Router();
const jwt_token = require('jsonwebtoken');
const dbConn = require('../../config/db');

// SELECT or (VIEW)
router.get('/ViewEvent', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);

        var Student_Id = req.body.Student_Id;

        sqlQuery = `SELECT Title, Start_Date, End_Date, Time FROM event__cldr WHERE Student_Id = ${Student_Id}`;

        dbConn.con1.query(
            sqlQuery,
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    throw error;
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

module.exports = router;