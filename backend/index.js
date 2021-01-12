const express = require('express');
require('dotenv').config();
const pay = require('./routes/pay');
const inquire = require('./routes/inquire');

const app = express();

app.use('/pay', pay);
app.use('/inquire', inquire);

app.listen(8000);