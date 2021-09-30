require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const {dataBaseConnect} = require('./connection/ConnectionDB')

//setting
app.set('port', process.env.PORT);

//middleware
app.use(morgan(`dev`));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./routers/account'));
app.use(require('./routers/login'));

//Connect the data base
dataBaseConnect();

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});

