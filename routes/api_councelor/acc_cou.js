var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var jwt_token = require('jsonwebtoken');

var dbConn = require('../../config/db');

function generateAuthToken(loginInfo) {
    return jwt_token.sign({Info: loginInfo}, process.env.Special_Token, {expiresIn: '1h'});
}

router.post('/login', async (req, res, next) => {
    var Counselor_Id = req.body.Counselor_Id;
    var Username = req.body.Username;
    var Password = req.body.Password;
    
    if(!Counselor_Id || !Username || !Password){
        return res.status(400).json({error: 'Missing fields'});
    }
    
    try{  
        sqlQuery = `SELECT * FROM login__cred_cou WHERE Councelor_Id = ${Counselor_Id} AND Username = "${Username}"`
        
        dbConn.con1.query(sqlQuery, async(error, results) => {
            console.log(results);
            
            if(results.length > 0){
                if(await bcrypt.compare(Password, results[0].Password)) {
                    var login_Info = {
                        Counselor_Id: results[0].Counselor_Id,
                        Username: results[0].Username
                    }
                    var auth = generateAuthToken(login_Info);
                    res.status(200).json({Staus: true, token: auth});
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

    var Counselor_Id = req.body.Counselor_Id;
    var Password = req.body.Password;

    const salt_rounds = 10;
    const hash_password = await bcrypt.hash(Password,parseInt(salt_rounds))

    sqlQuery = `UPDATE login__cred_cou SET Password = "${hash_password}" WHERE Counselor_Id = ${Counselor_Id}`

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