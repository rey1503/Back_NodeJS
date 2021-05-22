const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enigma = require('enigma-code');
const NewUser = require('./Models/NewUser');
const verificarAuth = require('./Middlewares/ValidateToken')
require('dotenv').config();
require('./Database/DataBase')
var path = require("path");
var Controller = require('./Routers/routes');
const app = express();
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.post('/NewUser',verificarAuth,Controller.Add);
app.get('/BringAllTheData',verificarAuth,Controller.BringAllTheData);
app.delete('/Delete:id',verificarAuth,Controller.Delete);
app.get('/Recove',verificarAuth,Controller.Recove);
app.post('/Login', Controller.Login);
app.post('/DecryptPassword', Controller.DecryptPassword);
app.listen(process.env.PORT, () => {
    console.log('conectado');
})