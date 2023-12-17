var express = require('express');

var router = express.Router();

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

// SELECT or (VIEW)
router.get('/ViewNotification', (req, res) => {
    const Pass = req.headers.authorization.split(' ')[1];

    if (!Pass) {
        console.log('JWT token not found');
        return res.status(401).json({ success: false, message: "Error, JWT token not found" });
    }

    try {
        console.log('Decoding JWT token');
        const decodedToken = jwt_token.verify(Pass, process.env.Special_Token);

        var Student_Id = req.body.Student_Id
        var sqlQuery = `SELECT Title, Content, Date_Created FROM event__notif WHERE Student_Id = ${Student_Id}`;

        dbConn.con1.query(
            sqlQuery,
            function (error, results, fields) {
                if (error) {
                    console.log('Error executing query', error);
                    return res.status(500).json({ success: false, message: "Error executing query" }); // Send an error response directly
                }
                console.log('New event added', results);
                return res.status(200).json(results); // Use 'return' here
            }
        );
    } catch (error) {
        console.log('Error caught', error);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
    }
});

module.exports = router;