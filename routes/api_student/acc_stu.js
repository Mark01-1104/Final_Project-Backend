var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/login', async (req, res, next) => {
    var Student_Id = req.body.Student_Id;
    var Username = req.body.Username;
    var Password = req.body.Password;
    
    if(!Student_Id || !Username || !Password){
        return res.status(400).json({error: 'Missing fields'});
    }
    
    try{  
        sqlQuery = `SELECT * FROM login__cred_stu WHERE Student_Id = ${Student_Id} AND Username = "${Username}"`
        
        dbConn.con1.query(sqlQuery, async(error, results) => {
            console.log(results);
        Object.keys(results).forEach(function(key){
            var row = results[key]

            var Student_Id = row.Student_Id;
            var Username = row.Username;

            var login_Info = {
                Student_Id: row.Student_Id,
                Username: row.Username
            }

auth = jwt_token.sign({Info: login_Info},process.env.Special_Token,{expiresIn:'1h'});

           res.status(200).json({success: true, token: auth});
        });
            
            if(results.length > 0){
                if(await bcrypt.compare(Password, results[0].Password)) {
                    res.status(200).json({Status: true});
                } else {
                    res.status(401).json({error: 'Invalid credentials'});
                }
            } else {
                res.status(401).json({error: 'Invalid credentials'});
            }
        });
    }
    catch(error){
        console.log(error);
        return next(error);
    }
});

// UPDATE
router.put('/Update_Cred', async (req, res) => {
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

    var Student_Id = req.body.Student_Id;
    var Password = req.body.Password;

    const salt_rounds = 10;
    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `UPDATE login__cred_stu SET Password = "${hash_password}" WHERE Student_Id = ${Student_Id}`

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
module.exports = router;