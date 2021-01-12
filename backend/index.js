const express = require('express');
require('dotenv').config();
const pay = require('./routes/pay');

const app = express();

app.use('/pay', pay);

app.listen(8000);