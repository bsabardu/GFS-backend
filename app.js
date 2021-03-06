const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ini = require('ini');
const fs = require('fs');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path')


const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

//Création de la variable de connexion mongoDB
const mongoAccess = "mongodb+srv://" + config.database.user + ":" + config.database.password + "@" + config.database.database;


mongoose.connect(mongoAccess ,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=> console.log('Connexion à MongoDB réussie!'))
    .catch(()=> console.log('Problème de connexion à MongoDB'));

const app = express();

app.use(bodyParser())


app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app

