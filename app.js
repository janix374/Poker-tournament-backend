require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PlayersRoutes = require('./routes/players');
const GamesRoutes = require('./routes/games');
const apiErrorHandler = require('./error/api-error-handler');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DATABASE_DB});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    //give acess to any client
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods','PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({})
        }
    next();
})

app.use('/players', PlayersRoutes);
app.use('/games', GamesRoutes);
app.use(apiErrorHandler);


module.exports = app;