const express = require('express');
require('dotenv').config({path:'./.env'});
const cors = require('cors');
const jwt_token = require('jsonwebtoken');
const app = express();
require('dotenv').config({path:'./.env'});


const admin_stu_route = require('./routes/api_admin/Personal_Info/api_admin_stu.js');
const admin_cou_route = require('./routes/api_admin/Personal_Info/api_admin_cou.js');
const admin_stu_cred_route = require('./routes/api_admin/Authentication/login_cred_stu.js');
const admin_cou_cred_route = require('./routes/api_admin/Authentication/login_cred_cou.js');
const stu_acc_route = require('./routes/api_student/acc_stu.js');
const cou_acc_route = require('./routes/api_councelor/acc_cou.js');
const cou_cldr_route = require('./routes/api_councelor/clndr_cou.js');
const cou_notif_route = require('./routes/api_councelor/notif_cou.js');
const stu_cldr_route = require('./routes/api_student/clndr_stu.js');
const stu_notif_route = require('./routes/api_student/notif_stu.js');
const stu_req_route = require('./routes/api_student/req_stu.js');
const cou_req_route = require('./routes/api_councelor/req_cou.js');


// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use('/api_admin_stu', admin_stu_route);
app.use('/api_admin_cou', admin_cou_route);
app.use('/login_cred_stu', admin_stu_cred_route);
app.use('/login_cred_cou', admin_cou_cred_route);
app.use('/acc_stu', stu_acc_route);
app.use('/acc_cou', cou_acc_route);
app.use('/clndr_cou', cou_cldr_route);
app.use('/clndr_stu', stu_cldr_route);
app.use('/notif_cou', cou_notif_route);
app.use('/notif_stu', stu_notif_route);
app.use('/req_stu', stu_req_route);
app.use('/req_cou', cou_req_route);

app.get('/', (req, res) => res.send('Server Is Running In Perfect Condition'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));